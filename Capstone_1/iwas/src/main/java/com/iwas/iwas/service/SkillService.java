package com.iwas.iwas.service;

import com.iwas.iwas.model.Skill;
import com.iwas.iwas.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    
    @Autowired
    private SkillRepository skillRepository;
    
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }
    
    public Optional<Skill> getSkillByName(String name) {
        return skillRepository.findByName(name);
    }
    
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    public Skill updateSkill(Skill skill) {
        return skillRepository.save(skill);
    }
    
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
    
    public Skill getOrCreateSkill(String name) {
        Optional<Skill> skillOpt = skillRepository.findByName(name);
        if (skillOpt.isPresent()) {
            return skillOpt.get();
        } else {
            Skill newSkill = new Skill(name);
            return skillRepository.save(newSkill);
        }
    }
}

