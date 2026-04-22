package com.hrportal.hr_portal.controller;

import com.hrportal.hr_portal.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/hr")
public class HrController {

    @Autowired
    private HrService hrService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        String token = hrService.login(email, password);

        return ResponseEntity.ok(Map.of("token", token));
    }
}
