package com.NTIWAS.iwas_backend.service;

import com.NTIWAS.iwas_backend.model.Skill;
import com.NTIWAS.iwas_backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillById(int id) {
        return skillRepository.findById(id).orElse(null);
    }

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkill(int id) {
        skillRepository.deleteById(id);
    }
}
