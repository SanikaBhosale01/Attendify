package com.example.AttendanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AttendanceSystem.model.AttendanceSession;

public interface AttendanceSessionRepository
        extends JpaRepository<AttendanceSession, String> {
}
