package com.example.attendance_Backend.repository;

import com.example.attendance_Backend.model.Setting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingRepository extends JpaRepository<Setting, Long> {
}
