package com.iwas.iwas.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String name;
    
    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="skill-user-reference")
    private Set<UserSkill> userSkills = new HashSet<>();
    
    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="skill-project-reference")
    private Set<ProjectSkill> projectSkills = new HashSet<>();
    
    // Constructors
    public Skill() {}
    
    public Skill(String name) {
        this.name = name;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserSkill> getUserSkills() {
        return userSkills;
    }

    public void setUserSkills(Set<UserSkill> userSkills) {
        this.userSkills = userSkills;
    }

    public Set<ProjectSkill> getProjectSkills() {
        return projectSkills;
    }

    public void setProjectSkills(Set<ProjectSkill> projectSkills) {
        this.projectSkills = projectSkills;
    }
}