package com.iwas.iwas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "project_skills")
public class ProjectSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference(value="project-skill-reference")
    private Project project;
    
    @ManyToOne
    @JoinColumn(name = "skill_id")
    @JsonBackReference(value="skill-project-reference")
    private Skill skill;
    
    // Constructors
    public ProjectSkill() {}
    
    public ProjectSkill(Project project, Skill skill) {
        this.project = project;
        this.skill = skill;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}