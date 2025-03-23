package com.iwas.iwas.controller;

import com.iwas.iwas.model.User;
import com.iwas.iwas.model.UserSkill;
import com.iwas.iwas.service.UserService;
import com.iwas.iwas.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserSkillService userSkillService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getAllEmployees() {
        return ResponseEntity.ok(userService.getAllEmployees());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userService.getUserById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Get user skills
            List<UserSkill> skills = userSkillService.getUserSkills(id);
            List<Map<String, Object>> skillsData = skills.stream().map(skill -> {
                Map<String, Object> skillMap = new HashMap<>();
                skillMap.put("id", skill.getId());
                skillMap.put("skillId", skill.getSkill().getId());
                skillMap.put("skillName", skill.getSkill().getName());
                skillMap.put("rating", skill.getRating());
                return skillMap;
            }).collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("status", user.getStatus());
            response.put("skills", skillsData);
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> userData) {
        Optional<User> userOpt = userService.getUserById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            if (userData.containsKey("name")) {
                user.setName((String) userData.get("name"));
            }
            
            if (userData.containsKey("email")) {
                user.setEmail((String) userData.get("email"));
            }
            
            if (userData.containsKey("password")) {
                user.setPassword((String) userData.get("password"));
            }
            
            if (userData.containsKey("role")) {
                user.setRole((String) userData.get("role"));
            }
            
            if (userData.containsKey("status")) {
                user.setStatus((String) userData.get("status"));
            }
            
            return ResponseEntity.ok(userService.updateUser(user));
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    
    @PostMapping("/{id}/promote")
    public ResponseEntity<?> promoteToAdmin(@PathVariable Long id) {
        User user = userService.promoteToAdmin(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<User>> getAvailableEmployees() {
        return ResponseEntity.ok(userService.getAvailableEmployees());
    }
    
    @PostMapping("/{userId}/skills")
    public ResponseEntity<?> addUserSkill(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> skillData) {
        
        Long skillId = Long.valueOf(skillData.get("skillId").toString());
        Integer rating = Integer.valueOf(skillData.get("rating").toString());
        
        UserSkill userSkill = userSkillService.addUserSkill(userId, skillId, rating);
        if (userSkill != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", userSkill.getId());
            response.put("skillId", userSkill.getSkill().getId());
            response.put("skillName", userSkill.getSkill().getName());
            response.put("rating", userSkill.getRating());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body("Failed to add skill");
    }
    
    @PutMapping("/{userId}/skills/{skillId}")
    public ResponseEntity<?> updateUserSkill(
            @PathVariable Long userId,
            @PathVariable Long skillId,
            @RequestBody Map<String, Object> skillData) {
        
        Integer rating = Integer.valueOf(skillData.get("rating").toString());
        
        UserSkill userSkill = userSkillService.updateUserSkill(skillId, rating);
        if (userSkill != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", userSkill.getId());
            response.put("skillId", userSkill.getSkill().getId());
            response.put("skillName", userSkill.getSkill().getName());
            response.put("rating", userSkill.getRating());
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body("Failed to update skill");
    }
    
    @DeleteMapping("/{userId}/skills/{skillId}")
    public ResponseEntity<?> deleteUserSkill(
            @PathVariable Long userId,
            @PathVariable Long skillId) {
        
        userSkillService.deleteUserSkill(skillId);
        return ResponseEntity.ok("Skill deleted successfully");
    }
}

