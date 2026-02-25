package com.example.AttendanceSystem.controller;

import com.example.AttendanceSystem.model.ClassEntity;
import com.example.AttendanceSystem.service.ClassService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "*")
public class ClassController {

    private final ClassService service;

    public ClassController(ClassService service) {
        this.service = service;
    }

    // ✅ GET ALL CLASSES (FOR DASHBOARD)
    @GetMapping
    public List<ClassEntity> getAllClasses() {
        return service.getAllClasses();
    }

    // ✅ ADD CLASS (KEEP AS IT IS)
    @PostMapping("/add")
    public ClassEntity addClass(@RequestBody ClassEntity cls) {
        return service.saveClass(cls);
    }

    // ✅ GET CLASSES BY TEACHER (KEEP AS IT IS)
    @GetMapping("/teacher/{teacherName}")
    public List<ClassEntity> getClasses(@PathVariable String teacherName) {
        return service.getClassesByTeacher(teacherName.trim());
    }

    // ===============================
    // 🔹 ADD BELOW THIS LINE
    // ===============================

    // ✅ GET CLASS BY ID (for Edit)
    @GetMapping("/{id}")
    public ClassEntity getClassById(@PathVariable Long id) {
        return service.getClassById(id);
    }

    // ✅ UPDATE CLASS
    @PutMapping("/update/{id}")
    public ClassEntity updateClass(
            @PathVariable Long id,
            @RequestBody ClassEntity cls) {
        return service.updateClass(id, cls);
    }

    // ✅ DELETE CLASS
    @DeleteMapping("/delete/{id}")
    public void deleteClass(@PathVariable Long id) {
        service.deleteClass(id);
    }
}
