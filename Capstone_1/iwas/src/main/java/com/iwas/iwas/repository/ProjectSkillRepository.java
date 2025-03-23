package com.iwas.iwas.repository;

import com.iwas.iwas.model.Project;
import com.iwas.iwas.model.ProjectSkill;
import com.iwas.iwas.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectSkillRepository extends JpaRepository<ProjectSkill, Long> {
    List<ProjectSkill> findByProject(Project project);
    
    List<ProjectSkill> findBySkill(Skill skill);
    
    Optional<ProjectSkill> findByProjectAndSkill(Project project, Skill skill);
}

