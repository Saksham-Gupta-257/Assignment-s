package com.iwas.iwas.controller;

import com.iwas.iwas.model.LeaveRequest;
import com.iwas.iwas.model.User;
import com.iwas.iwas.service.LeaveRequestService;
import com.iwas.iwas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {
    
    @Autowired
    private LeaveRequestService leaveRequestService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllLeaveRequests() {
        List<LeaveRequest> requests = leaveRequestService.getAllLeaveRequests();
        List<Map<String, Object>> response = requests.stream().map(this::mapLeaveRequestToResponse).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingLeaveRequests() {
        List<LeaveRequest> requests = leaveRequestService.getPendingLeaveRequests();
        List<Map<String, Object>> response = requests.stream().map(this::mapLeaveRequestToResponse).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getLeaveRequestById(@PathVariable Long id) {
        Optional<LeaveRequest> requestOpt = leaveRequestService.getLeaveRequestById(id);

        return requestOpt.map(request -> ResponseEntity.ok(mapLeaveRequestToResponse(request))).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserLeaveRequests(@PathVariable Long userId) {
        List<LeaveRequest> requests = leaveRequestService.getUserLeaveRequests(userId);
        List<Map<String, Object>> response = requests.stream().map(this::mapLeaveRequestToResponse).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<?> createLeaveRequest(@RequestBody Map<String, Object> requestData) {
        Long userId = Long.valueOf(requestData.get("userId").toString());
        String type = (String) requestData.get("type");
        LocalDate fromDate = LocalDate.parse((String) requestData.get("fromDate"));
        LocalDate toDate = LocalDate.parse((String) requestData.get("toDate"));
        String description = (String) requestData.get("description");
        
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            LeaveRequest leaveRequest = new LeaveRequest();
            leaveRequest.setUser(user);
            leaveRequest.setType(type);
            leaveRequest.setFromDate(fromDate);
            leaveRequest.setToDate(toDate);
            leaveRequest.setDescription(description);
            
            LeaveRequest savedRequest = leaveRequestService.createLeaveRequest(leaveRequest);
            return ResponseEntity.ok(mapLeaveRequestToResponse(savedRequest));
        }
        
        return ResponseEntity.badRequest().body("User not found");
    }
    
    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveLeaveRequest(@PathVariable Long id) {
        LeaveRequest request = leaveRequestService.approveLeaveRequest(id);
        if (request != null) {
            return ResponseEntity.ok(mapLeaveRequestToResponse(request));
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectLeaveRequest(@PathVariable Long id) {
        LeaveRequest request = leaveRequestService.rejectLeaveRequest(id);
        if (request != null) {
            return ResponseEntity.ok(mapLeaveRequestToResponse(request));
        }
        return ResponseEntity.notFound().build();
    }
    
    private Map<String, Object> mapLeaveRequestToResponse(LeaveRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", request.getId());
        response.put("type", request.getType());
        response.put("fromDate", request.getFromDate().toString());
        response.put("toDate", request.getToDate().toString());
        response.put("description", request.getDescription());
        response.put("status", request.getStatus());
        
        Map<String, Object> user = new HashMap<>();
        user.put("id", request.getUser().getId());
        user.put("name", request.getUser().getName());
        user.put("email", request.getUser().getEmail());
        
        response.put("user", user);
        
        return response;
    }
}

