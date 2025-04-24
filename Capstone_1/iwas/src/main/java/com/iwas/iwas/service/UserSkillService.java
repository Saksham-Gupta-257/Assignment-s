package com.iwas.iwas.service;

import com.iwas.iwas.model.Skill;
import com.iwas.iwas.model.User;
import com.iwas.iwas.model.UserSkill;
import com.iwas.iwas.repository.SkillRepository;
import com.iwas.iwas.repository.UserRepository;
import com.iwas.iwas.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    public List<UserSkill> getUserSkills(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(userSkillRepository::findByUser).orElse(List.of());
    }

    public Optional<UserSkill> getUserSkill(Long id) {
        return userSkillRepository.findById(id);
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public UserSkill addUserSkill(Long userId, Long skillId, Integer rating) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Skill> skillOpt = skillRepository.findById(skillId);

        if (userOpt.isPresent() && skillOpt.isPresent()) {
            User user = userOpt.get();
            Skill skill = skillOpt.get();

            Optional<UserSkill> existingSkill = userSkillRepository.findByUserAndSkill(user, skill);
            if (existingSkill.isPresent()) {
                UserSkill userSkill = existingSkill.get();
                userSkill.setRating(rating);
                return userSkillRepository.save(userSkill);
            } else {
                UserSkill userSkill = new UserSkill(user, skill, rating);
                return userSkillRepository.save(userSkill);
            }
        }
        return null;
    }

    public UserSkill updateUserSkill(Long id, Integer rating) {
        Optional<UserSkill> userSkillOpt = userSkillRepository.findById(id);
        if (userSkillOpt.isPresent()) {
            UserSkill userSkill = userSkillOpt.get();
            userSkill.setRating(rating);
            return userSkillRepository.save(userSkill);
        }
        return null;
    }

    public void deleteUserSkill(Long id) {
        userSkillRepository.deleteById(id);
    }

    public List<User> findEmployeesWithSkills(List<Long> skillIds) {
        List<UserSkill> userSkills = userSkillRepository.findTopUsersBySkills(skillIds);
        return userSkills.stream().map(UserSkill::getUser).distinct().collect(Collectors.toList());
    }

    public List<UserSkill> getAllUserSkills() {
        return userSkillRepository.findAll();
    }
}
