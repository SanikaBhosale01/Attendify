package com.example.attendance_Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.attendance_Backend.model.AttendanceSession;

public interface AttendanceSessionRepository
        extends JpaRepository<AttendanceSession, String> {
}
