package com.iwas.iwas.service;

import com.iwas.iwas.model.ProjectSkill;
import com.iwas.iwas.repository.ProjectSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectSkillService {

    private final ProjectSkillRepository projectSkillRepository;

    @Autowired
    public ProjectSkillService(ProjectSkillRepository projectSkillRepository) {
        this.projectSkillRepository = projectSkillRepository;
    }

    // Get all project-skill mappings
    public List<ProjectSkill> getAllProjectSkills() {
        return projectSkillRepository.findAll();
    }
}
