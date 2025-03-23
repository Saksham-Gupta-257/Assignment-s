package com.iwas.iwas.service;

import com.iwas.iwas.model.LeaveRequest;
import com.iwas.iwas.model.User;
import com.iwas.iwas.repository.LeaveRequestRepository;
import com.iwas.iwas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }
    
    public List<LeaveRequest> getPendingLeaveRequests() {
        return leaveRequestRepository.findByStatus("PENDING");
    }
    
    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }
    
    public List<LeaveRequest> getUserLeaveRequests(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(leaveRequestRepository::findByUser).orElse(List.of());
    }
    
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        leaveRequest.setStatus("PENDING");
        LeaveRequest savedRequest = leaveRequestRepository.save(leaveRequest);
        
        // Notify admins
        List<User> admins = userRepository.findByRole("ADMIN");
        for (User admin : admins) {
            notificationService.createNotification(admin, 
                    "New leave request from " + leaveRequest.getUser().getName());
        }
        
        return savedRequest;
    }
    
    public LeaveRequest approveLeaveRequest(Long id) {
        Optional<LeaveRequest> requestOpt = leaveRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            LeaveRequest request = requestOpt.get();
            request.setStatus("APPROVED");
            
            // Update user status
            User user = request.getUser();
            user.setStatus("ON_LEAVE");
            userRepository.save(user);
            
            // Notify user
            notificationService.createNotification(user, "Your leave request has been approved");
            
            return leaveRequestRepository.save(request);
        }
        return null;
    }
    
    public LeaveRequest rejectLeaveRequest(Long id) {
        Optional<LeaveRequest> requestOpt = leaveRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            LeaveRequest request = requestOpt.get();
            request.setStatus("REJECTED");
            
            // Notify user
            notificationService.createNotification(request.getUser(), 
                    "Your leave request has been rejected");
            
            return leaveRequestRepository.save(request);
        }
        return null;
    }
}

