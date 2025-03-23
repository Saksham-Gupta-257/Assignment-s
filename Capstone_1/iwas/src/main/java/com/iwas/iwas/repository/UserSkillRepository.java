package com.iwas.iwas.repository;

import com.iwas.iwas.model.Skill;
import com.iwas.iwas.model.User;
import com.iwas.iwas.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUser(User user);
    
    List<UserSkill> findBySkill(Skill skill);
    
    Optional<UserSkill> findByUserAndSkill(User user, Skill skill);
    
    @Query("SELECT us FROM UserSkill us WHERE us.skill.id IN :skillIds AND us.user.status = 'ON_BENCH' ORDER BY us.rating DESC")
    List<UserSkill> findTopUsersBySkills(List<Long> skillIds);
}

