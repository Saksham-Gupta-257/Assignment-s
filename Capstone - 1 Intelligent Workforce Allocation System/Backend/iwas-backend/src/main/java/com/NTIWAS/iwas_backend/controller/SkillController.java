package com.NTIWAS.iwas_backend.controller;

import com.NTIWAS.iwas_backend.model.Skill;
import com.NTIWAS.iwas_backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/{id}")
    public Skill getSkillById(@PathVariable int id) {
        return skillService.getSkillById(id);
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillService.addSkill(skill);
    }

    @PutMapping
    public Skill updateSkill(@RequestBody Skill skill) {
        return skillService.updateSkill(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable int id) {
        skillService.deleteSkill(id);
    }
}
