package com.hrportal.hr_portal.service;

import com.hrportal.hr_portal.model.Hr;
import com.hrportal.hr_portal.repository.HrRepository;
import com.hrportal.hr_portal.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HrService {

    @Autowired
    private HrRepository hrRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String email, String password) {
        Optional<Hr> hr = hrRepository.findByEmail(email);

        if (hr.isPresent()) {
            if (hr.get().getPassword().equals(password)) {
                // Generate JWT token
                return jwtUtil.generateToken(email);
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
