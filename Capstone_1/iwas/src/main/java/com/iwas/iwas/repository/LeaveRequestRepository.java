package com.iwas.iwas.repository;

import com.iwas.iwas.model.LeaveRequest;
import com.iwas.iwas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUser(User user);
    
    List<LeaveRequest> findByStatus(String status);
    
    List<LeaveRequest> findByUserAndStatus(User user, String status);
}

