package com.example.attendance_Backend.repository;

import com.example.attendance_Backend.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository<Notes, Long> {
}