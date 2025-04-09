package com.iwas.iwas.controller;

import com.iwas.iwas.model.Skill;
import com.iwas.iwas.model.UserSkill;
import com.iwas.iwas.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user-skills")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    // Get all user skills
    @GetMapping
    public ResponseEntity<List<UserSkillDTO>> getAllUserSkills() {
        List<UserSkill> userSkills = userSkillService.getAllUserSkills();
        List<UserSkillDTO> userSkillDTOs = userSkills.stream()
            .map(UserSkillDTO::new)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(userSkillDTOs);
    }

    // Get user skills by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSkillDTO>> getUserSkills(@PathVariable Long userId) {
        List<UserSkill> userSkills = userSkillService.getUserSkills(userId);
        List<UserSkillDTO> userSkillDTOs = userSkills.stream()
            .map(UserSkillDTO::new)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(userSkillDTOs);
    }

    // Add a new user skill
    @PostMapping
    public ResponseEntity<UserSkillDTO> addUserSkill(
        @RequestParam Long userId, 
        @RequestParam Long skillId, 
        @RequestParam Integer rating
    ) {
        UserSkill userSkill = userSkillService.addUserSkill(userId, skillId, rating);
        
        if (userSkill != null) {
            return ResponseEntity.ok(new UserSkillDTO(userSkill));
        }
        
        return ResponseEntity.badRequest().build();
    }

    // Update user skill rating
    @PutMapping("/{id}")
    public ResponseEntity<UserSkillDTO> updateUserSkill(
        @PathVariable Long id, 
        @RequestParam Integer rating
    ) {
        UserSkill userSkill = userSkillService.updateUserSkill(id, rating);
        
        if (userSkill != null) {
            return ResponseEntity.ok(new UserSkillDTO(userSkill));
        }
        
        return ResponseEntity.notFound().build();
    }

    // Delete a user skill
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable Long id) {
        userSkillService.deleteUserSkill(id);
        return ResponseEntity.ok().build();
    }

    // DTO to prevent recursive JSON serialization
    public static class UserSkillDTO {
        private Long id;
        private Long userId;
        private Long skillId;
        private String skillName;
        private Integer rating;

        public UserSkillDTO(UserSkill userSkill) {
            this.id = userSkill.getId();
            this.userId = userSkill.getUser().getId();
            this.skillId = userSkill.getSkill().getId();
            this.skillName = userSkill.getSkill().getName();
            this.rating = userSkill.getRating();
        }
        
        public Long getId() { return id; }
        public Long getUserId() { return userId; }
        public Long getSkillId() { return skillId; }
        public String getSkillName() { return skillName; }
        public Integer getRating() { return rating; }
    }
}