package com.iwas.iwas.repository;

import com.iwas.iwas.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(String status);
    
    @Query("SELECT p FROM Project p JOIN p.assignedUsers pa WHERE pa.user.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") Long userId);
}