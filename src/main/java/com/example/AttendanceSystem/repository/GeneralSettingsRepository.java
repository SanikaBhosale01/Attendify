package com.example.AttendanceSystem.repository;

import com.example.AttendanceSystem.model.GeneralSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralSettingsRepository extends JpaRepository<GeneralSettings, Long> {
    // JpaRepository provides findById, save, etc.
}
