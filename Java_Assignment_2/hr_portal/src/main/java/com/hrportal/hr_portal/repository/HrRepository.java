package com.hrportal.hr_portal.repository;

import com.hrportal.hr_portal.model.Hr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HrRepository extends JpaRepository<Hr, Long> {
    Optional<Hr> findByEmail(String email);
}
