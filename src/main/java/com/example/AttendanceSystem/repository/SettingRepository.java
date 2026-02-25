package com.example.AttendanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AttendanceSystem.model.Setting;

public interface SettingRepository extends JpaRepository<Setting, Long> {
}
