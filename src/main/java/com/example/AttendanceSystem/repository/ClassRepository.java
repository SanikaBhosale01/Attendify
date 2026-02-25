package com.example.AttendanceSystem.repository;

import com.example.AttendanceSystem.model.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    List<ClassEntity> findByTeacherName(String teacherName);


}
