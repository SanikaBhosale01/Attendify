package com.example.attendance_Backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AttendanceSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String subject;

    private double teacherLat;
    private double teacherLng;

    private LocalDateTime expiryTime;

    // Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public double getTeacherLat() {
        return teacherLat;
    }

    public void setTeacherLat(double teacherLat) {
        this.teacherLat = teacherLat;
    }

    public double getTeacherLng() {
        return teacherLng;
    }

    public void setTeacherLng(double teacherLng) {
        this.teacherLng = teacherLng;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }
}
