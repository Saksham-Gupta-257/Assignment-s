package com.iwas.iwas.repository;

import com.iwas.iwas.model.Project;
import com.iwas.iwas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(String status);
    
    List<Project> findByAssignedTo(User user);
}

