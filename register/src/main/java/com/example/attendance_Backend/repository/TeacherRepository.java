package com.example.attendance_Backend.repository;

import com.example.attendance_Backend.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    Optional<Teacher> findByEmailAndPassword(String email, String password);
    Optional<Teacher> findByEmail(String email);
//    Optional<Teacher> findByEmail(String email);
    boolean existsByEmail(String email);
}
