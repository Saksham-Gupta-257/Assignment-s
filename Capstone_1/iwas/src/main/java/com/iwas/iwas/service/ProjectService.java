package com.iwas.iwas.service;

import com.iwas.iwas.model.Project;
import com.iwas.iwas.model.ProjectSkill;
import com.iwas.iwas.model.Skill;
import com.iwas.iwas.model.User;
import com.iwas.iwas.repository.ProjectRepository;
import com.iwas.iwas.repository.ProjectSkillRepository;
import com.iwas.iwas.repository.UserRepository;
import com.iwas.iwas.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private ProjectSkillRepository projectSkillRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserSkillService userSkillService;
    
    @Autowired
    private NotificationService notificationService;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public List<Project> getActiveProjects() {
        return projectRepository.findByStatus("ACTIVE");
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public Project createProject(Project project) {
        project.setStatus("ACTIVE");
        return projectRepository.save(project);
    }
    
    public Project updateProject(Project project) {
        Optional<Project> existingProject = projectRepository.findById(project.getId());
    
        if (existingProject.isPresent() && 
            "COMPLETED".equals(project.getStatus())) {
        
            // If project is being marked as completed and has an assigned user
            User assignedUser = existingProject.get().getAssignedTo();
            if (assignedUser != null) {
                // Update user status to ON_BENCH
                assignedUser.setStatus("ON_BENCH");
                userRepository.save(assignedUser);
            }
        }
    
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    public Project assignProject(Long projectId, Long userId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (projectOpt.isPresent() && userOpt.isPresent()) {
            Project project = projectOpt.get();
            User user = userOpt.get();
            
            // Update project
            project.setAssignedTo(user);
            
            // Update user status
            user.setStatus("IN_PROJECT");
            userRepository.save(user);
            
            // Create notification
            notificationService.createNotification(user, "You have been assigned to project: " + project.getName());
            
            return projectRepository.save(project);
        }
        return null;
    }
    
    public List<User> suggestEmployeesForProject(Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            List<ProjectSkill> requiredSkills = projectSkillRepository.findByProject(project);
        
            List<Long> skillIds = requiredSkills.stream()
                    .map(ps -> ps.getSkill().getId())
                    .collect(Collectors.toList());
        
            // Find employees with matching skills
            List<User> suggestedEmployees = userSkillService.findEmployeesWithSkills(skillIds);
        
            suggestedEmployees.forEach(user -> {
                // Filter and mark matched skills for this user
                List<Skill> matchedSkills = requiredSkills.stream()
                    .filter(projectSkill -> 
                        user.getSkills().stream()
                            .anyMatch(userSkill -> 
                                userSkill.getSkill().getId().equals(projectSkill.getSkill().getId())
                            )
                    )
                    .map(ProjectSkill::getSkill)
                    .collect(Collectors.toList());

                user.setTransientMatchedSkills(matchedSkills);
            });
        
            return suggestedEmployees;
        }
        return List.of();
    }
    
    public List<Project> getUserProjects(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(projectRepository::findByAssignedTo).orElse(List.of());
    }
    
    public ProjectSkill addProjectSkill(Long projectId, Long skillId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<Skill> skillOpt = userSkillService.getSkillById(skillId);
        
        if (projectOpt.isPresent() && skillOpt.isPresent()) {
            Project project = projectOpt.get();
            Skill skill = skillOpt.get();
            
            Optional<ProjectSkill> existingSkill = projectSkillRepository.findByProjectAndSkill(project, skill);
            if (existingSkill.isPresent()) {
                return existingSkill.get();
            } else {
                ProjectSkill projectSkill = new ProjectSkill(project, skill);
                return projectSkillRepository.save(projectSkill);
            }
        }
        return null;
    }
    
    public void removeProjectSkill(Long projectId, Long skillId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<Skill> skillOpt = userSkillService.getSkillById(skillId);
        
        if (projectOpt.isPresent() && skillOpt.isPresent()) {
            Project project = projectOpt.get();
            Skill skill = skillOpt.get();
            
            Optional<ProjectSkill> existingSkill = projectSkillRepository.findByProjectAndSkill(project, skill);
            existingSkill.ifPresent(projectSkillRepository::delete);
        }
    }
}

