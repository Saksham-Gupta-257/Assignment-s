package com.iwas.iwas.controller;

import com.iwas.iwas.model.ProjectSkill;
import com.iwas.iwas.service.ProjectSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;

@RestController
@RequestMapping("/api/project-skills")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectSkillController {

    private final ProjectSkillService projectSkillService;

    @Autowired
    public ProjectSkillController(ProjectSkillService projectSkillService) {
        this.projectSkillService = projectSkillService;
    }

    // Get all project-skill mappings
    @GetMapping
    public List<Map<String, Object>> getAllProjectSkills() {
        List<ProjectSkill> projectSkills = projectSkillService.getAllProjectSkills();
    
        return projectSkills.stream().map(ps -> {
            Map<String, Object> response = new HashMap<>();
            response.put("project", Map.of("id", ps.getProject().getId()));
            response.put("skill", Map.of("id", ps.getSkill().getId()));
            return response;
        }).collect(Collectors.toList());
    }
}
