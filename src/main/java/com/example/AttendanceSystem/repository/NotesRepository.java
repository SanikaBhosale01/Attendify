package com.example.AttendanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.AttendanceSystem.model.Notes;

public interface NotesRepository extends JpaRepository<Notes, Long> {
    
}