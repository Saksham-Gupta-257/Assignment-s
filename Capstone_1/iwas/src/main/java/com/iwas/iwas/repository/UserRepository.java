package com.iwas.iwas.repository;

import com.iwas.iwas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);
    
    List<User> findByStatus(String status);
    
    @Query("SELECT u FROM User u WHERE u.role = 'EMPLOYEE' AND u.status = 'ON_BENCH'")
    List<User> findAvailableEmployees();
}

