package com.iwas.iwas.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value="user-leave-reference")
    private User user;
    
    private String type; // "SICK", "VACATION", "OTHER"
    
    private LocalDate fromDate;
    
    private LocalDate toDate;
    
    private String description;
    
    private String status; // "PENDING", "APPROVED", "REJECTED"
    
    // Constructors
    public LeaveRequest() {}
    
    public LeaveRequest(User user, String type, LocalDate fromDate, LocalDate toDate, String description, String status) {
        this.user = user;
        this.type = type;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
