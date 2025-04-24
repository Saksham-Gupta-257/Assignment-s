package com.iwas.iwas.service;

import com.iwas.iwas.model.*;
import com.iwas.iwas.repository.ProjectAssignmentRepository;
import com.iwas.iwas.repository.ProjectRepository;
import com.iwas.iwas.repository.ProjectSkillRepository;
import com.iwas.iwas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
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

    @Autowired
    private ProjectAssignmentRepository projectAssignmentRepository;

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

        if (existingProject.isPresent() && "COMPLETED".equals(project.getStatus())) {

            // If project is being marked as completed, update status of all assigned users
            Project currentProject = existingProject.get();
            for (ProjectAssignment assignment : currentProject.getAssignedUsers()) {
                User assignedUser = assignment.getUser();
                assignedUser.setStatus("ON_BENCH"); // Update user status to ON_BENCH
                userRepository.save(assignedUser);
            }
        }

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project assignUserToProject(Long projectId, Long userId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (projectOpt.isPresent() && userOpt.isPresent()) {
            Project project = projectOpt.get();
            User user = userOpt.get();

            // Check if user is already assigned to this project
            boolean alreadyAssigned = project.getAssignedUsers().stream()
                    .anyMatch(assignment -> assignment.getUser().getId().equals(userId));

            if (!alreadyAssigned) {
                ProjectAssignment assignment = new ProjectAssignment(user, project); // Create new assignment
                project.getAssignedUsers().add(assignment);

                user.setStatus("IN_PROJECT"); // Update user status
                userRepository.save(user);

                notificationService.createNotification(user, "You have been assigned to project: " + project.getName()); // Create
                                                                                                                         // notification

                return projectRepository.save(project);
            }
        }
        return null;
    }

    public void removeUserFromProject(Long projectId, Long userId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (projectOpt.isPresent() && userOpt.isPresent()) {
            Project project = projectOpt.get();
            User user = userOpt.get();

            // Find and remove the assignment
            for (ProjectAssignment assignment : new java.util.HashSet<>(project.getAssignedUsers())) {
                if (assignment.getUser().getId().equals(userId)) {
                    project.getAssignedUsers().remove(assignment);
                    user.getProjectAssignments().remove(assignment);
                    projectAssignmentRepository.delete(assignment);

                    // Update user status if they have no other projects
                    if (user.getProjectAssignments().isEmpty()) {
                        user.setStatus("ON_BENCH");
                        userRepository.save(user);
                    }

                    // Create notification
                    notificationService.createNotification(user,
                            "You have been removed from project: " + project.getName());

                    projectRepository.save(project);
                    break;
                }
            }
        }
    }

    public List<User> suggestEmployeesForProject(Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            List<ProjectSkill> requiredSkills = projectSkillRepository.findByProject(project);

            List<Long> skillIds = requiredSkills.stream().map(ps -> ps.getSkill().getId()).collect(Collectors.toList());

            // Find employees with matching skills
            List<User> suggestedEmployees = userSkillService.findEmployeesWithSkills(skillIds);

            // Filter out users already assigned to this project
            Set<Long> assignedUserIds = project.getAssignedUsers().stream()
                    .map(assignment -> assignment.getUser().getId()).collect(Collectors.toSet());

            suggestedEmployees = suggestedEmployees.stream().filter(user -> !assignedUserIds.contains(user.getId()))
                    .collect(Collectors.toList());

            suggestedEmployees.forEach(user -> {
                // Filter and mark matched skills for this user
                List<Skill> matchedSkills = requiredSkills.stream()
                        .filter(projectSkill -> user.getSkills().stream().anyMatch(
                                userSkill -> userSkill.getSkill().getId().equals(projectSkill.getSkill().getId())))
                        .map(ProjectSkill::getSkill).collect(Collectors.toList());

                user.setTransientMatchedSkills(matchedSkills);
            });

            return suggestedEmployees;
        }
        return List.of();
    }

    public List<User> getAssignedUsers(Long projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            return project.getAssignedUsers().stream().map(ProjectAssignment::getUser).collect(Collectors.toList());
        }
        return List.of();
    }

    public List<Project> getUserProjects(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getProjectAssignments().stream().map(ProjectAssignment::getProject).collect(Collectors.toList());
        }
        return List.of();
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