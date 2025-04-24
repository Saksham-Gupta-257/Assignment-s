package com.iwas.iwas.controller;

import com.iwas.iwas.model.Notification;
import com.iwas.iwas.model.User;
import com.iwas.iwas.service.NotificationService;
import com.iwas.iwas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserNotifications(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<Notification> notifications = notificationService.getUserNotifications(userId, user);
            
            List<Map<String, Object>> response = notifications.stream().map(this::mapNotificationToResponse).collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<?> getUnreadNotifications(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<Notification> notifications = notificationService.getUnreadNotifications(user);
            
            List<Map<String, Object>> response = notifications.stream().map(this::mapNotificationToResponse).collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> getUnreadCount(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            long count = notificationService.getUnreadCount(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("count", count);
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification notification = notificationService.markAsRead(id);
        if (notification != null) {
            return ResponseEntity.ok(mapNotificationToResponse(notification));
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/user/{userId}/read-all")
    public ResponseEntity<?> markAllAsRead(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            notificationService.markAllAsRead(user);
            return ResponseEntity.ok("All notifications marked as read");
        }
        return ResponseEntity.notFound().build();
    }
    
    private Map<String, Object> mapNotificationToResponse(Notification notification) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", notification.getId());
        response.put("message", notification.getMessage());
        response.put("createdAt", notification.getCreatedAt().toString());
        response.put("isRead", notification.isRead());
        return response;
    }
}

