package com.iwas.iwas.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String description;
    
    private String status; // "ACTIVE", "COMPLETED"
    
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    @JsonBackReference(value="user-project-reference")
    private User assignedTo;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="project-skill-reference")
    private Set<ProjectSkill> requiredSkills = new HashSet<>();
    
    // Constructors
    public Project() {}
    
    public Project(String name, String description, String status) {
        this.name = name;
        this.description = description;
        this.status = status;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Set<ProjectSkill> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(Set<ProjectSkill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }
}
