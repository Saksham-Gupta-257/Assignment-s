package com.iwas.iwas.controller;

import com.iwas.iwas.model.Project;
import com.iwas.iwas.model.ProjectSkill;
import com.iwas.iwas.model.User;
import com.iwas.iwas.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Project>> getActiveProjects() {
        return ResponseEntity.ok(projectService.getActiveProjects());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        Optional<Project> projectOpt = projectService.getProjectById(id);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", project.getId());
            response.put("name", project.getName());
            response.put("description", project.getDescription());
            response.put("status", project.getStatus());
            
            if (project.getAssignedTo() != null) {
                Map<String, Object> assignedTo = new HashMap<>();
                assignedTo.put("id", project.getAssignedTo().getId());
                assignedTo.put("name", project.getAssignedTo().getName());
                response.put("assignedTo", assignedTo);
            }
            
            List<Map<String, Object>> skills = project.getRequiredSkills().stream()
                    .map(ps -> {
                        Map<String, Object> skill = new HashMap<>();
                        skill.put("id", ps.getSkill().getId());
                        skill.put("name", ps.getSkill().getName());
                        return skill;
                    })
                    .collect(Collectors.toList());
            
            response.put("requiredSkills", skills);
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Map<String, Object> projectData) {
        Optional<Project> projectOpt = projectService.getProjectById(id);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            
            if (projectData.containsKey("name")) {
                project.setName((String) projectData.get("name"));
            }
            
            if (projectData.containsKey("description")) {
                project.setDescription((String) projectData.get("description"));
            }
            
            if (projectData.containsKey("status")) {
                project.setStatus((String) projectData.get("status"));
            }
            
            return ResponseEntity.ok(projectService.updateProject(project));
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
    }
    
    @PostMapping("/{id}/assign/{userId}")
    public ResponseEntity<?> assignProject(@PathVariable Long id, @PathVariable Long userId) {
        Project project = projectService.assignProject(id, userId);
        if (project != null) {
            return ResponseEntity.ok(project);
        }
        return ResponseEntity.badRequest().body("Failed to assign project");
    }
    
    @GetMapping("/{id}/suggest")
    public ResponseEntity<List<User>> suggestEmployeesForProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.suggestEmployeesForProject(id));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable Long userId) {
        return ResponseEntity.ok(projectService.getUserProjects(userId));
    }
    
    @PostMapping("/{projectId}/skills/{skillId}")
    public ResponseEntity<?> addProjectSkill(
            @PathVariable Long projectId,
            @PathVariable Long skillId) {
        
        ProjectSkill projectSkill = projectService.addProjectSkill(projectId, skillId);
        if (projectSkill != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", projectSkill.getId());
            response.put("skillId", projectSkill.getSkill().getId());
            response.put("skillName", projectSkill.getSkill().getName());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body("Failed to add skill to project");
    }
    
    @DeleteMapping("/{projectId}/skills/{skillId}")
    public ResponseEntity<?> removeProjectSkill(
            @PathVariable Long projectId,
            @PathVariable Long skillId) {
        
        projectService.removeProjectSkill(projectId, skillId);
        return ResponseEntity.ok("Skill removed from project successfully");
    }
}

