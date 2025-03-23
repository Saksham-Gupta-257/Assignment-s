package com.iwas.iwas.controller;

import com.iwas.iwas.model.User;
import com.iwas.iwas.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String role = credentials.get("role");
        
        if (email == null || password == null || role == null) {
            return ResponseEntity.badRequest().body("Email, password, and role are required");
        }
        
        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Check if role matches
            if (!user.getRole().equals(role)) {
                return ResponseEntity.badRequest().body("Invalid role for this user");
            }
            
            // Check password
            if (userService.authenticate(email, password)) {
                // Store user in session
                session.setAttribute("userId", user.getId());
                session.setAttribute("userRole", user.getRole());
                
                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("name", user.getName());
                response.put("email", user.getEmail());
                response.put("role", user.getRole());
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid credentials");
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        String name = userData.get("name");
        String email = userData.get("email");
        String password = userData.get("password");
        
        if (name == null || email == null || password == null) {
            return ResponseEntity.badRequest().body("Name, email, and password are required");
        }
        
        // Check if email is valid (ends with @nt.com)
        if (!email.endsWith("@nt.com")) {
            return ResponseEntity.badRequest().body("Email must end with @nt.com");
        }
        
        // Check if email already exists
        if (userService.getUserByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        User user = userService.registerEmployee(name, email, password);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
    
    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            Optional<User> userOpt = userService.getUserById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("name", user.getName());
                response.put("email", user.getEmail());
                response.put("role", user.getRole());
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(401).body("Not authenticated");
    }
}

