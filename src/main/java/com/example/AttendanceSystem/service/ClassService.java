package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.model.ClassEntity;
import com.example.AttendanceSystem.repository.ClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    private final ClassRepository repo;

    public ClassService(ClassRepository repo) {
        this.repo = repo;
    }

    // ✅ KEEP AS IT IS
    public ClassEntity saveClass(ClassEntity cls) {
        return repo.save(cls);
    }

    // ✅ KEEP AS IT IS
    public List<ClassEntity> getClassesByTeacher(String teacherName) {
        return repo.findByTeacherName(teacherName);
    }

    // ===============================
    // 🔹 ADD BELOW THIS LINE
    // ===============================

    // ✅ GET CLASS BY ID (for Edit)
    public ClassEntity getClassById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));
    }

    // ✅ UPDATE CLASS
    public ClassEntity updateClass(Long id, ClassEntity updated) {
        ClassEntity existing = getClassById(id);

        existing.setClassName(updated.getClassName());
        existing.setSubject(updated.getSubject());
        existing.setSchedule(updated.getSchedule());
        existing.setRoom(updated.getRoom());
        existing.setDivisions(updated.getDivisions());
        existing.setDescription(updated.getDescription());

        return repo.save(existing);
    }

    // ✅ DELETE CLASS
    public void deleteClass(Long id) {
        repo.deleteById(id);
    }

    public List<ClassEntity> getAllClasses() {
        return repo.findAll();
    }

}
