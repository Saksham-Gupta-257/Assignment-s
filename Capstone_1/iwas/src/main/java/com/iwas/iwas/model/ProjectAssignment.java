package com.iwas.iwas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "project_assignments")
public class ProjectAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value="user-assignment-reference")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference(value="project-assignment-reference")
    private Project project;
    
    // Constructors
    public ProjectAssignment() {}
    
    public ProjectAssignment(User user, Project project) {
        this.user = user;
        this.project = project;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}