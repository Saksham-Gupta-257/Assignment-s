package com.NTIWAS.iwas_backend.model;

import jakarta.persistence.*;

@Entity
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skillId;

    @Column(nullable = false, unique = true)
    private String name;

    public int getSkillId() {
        return skillId;
    }

    public String getName() {
        return name;
    }

    public void setSkillId(int skillId) {
        this.skillId = skillId;
    }

    public void setName(String name) {
        this.name = name;
    }

}
