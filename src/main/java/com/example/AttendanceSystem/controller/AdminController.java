package com.example.AttendanceSystem.controller;

import com.example.AttendanceSystem.model.Teacher;
import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.service.AdminService;
import com.example.AttendanceSystem.service.TeacherAttendanceService;
import com.example.AttendanceSystem.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final TeacherService teacherService;
    private final AdminService adminService;


    public AdminController(TeacherService teacherService, AdminService adminService) {
        this.teacherService = teacherService;
        this.adminService = adminService;
    }

    // Get all teachers
    @GetMapping("/teachers")
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    // Get teacher by ID
    @GetMapping("/teachers/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable Integer id) {
        Optional<Teacher> teacherOpt = teacherService.getTeacherById(id);

        if (teacherOpt.isPresent()) {
            return ResponseEntity.ok(teacherOpt.get()); // Teacher object
        } else {
            return ResponseEntity.status(404).body("Teacher not found"); // String error
        }
    }


    // Delete teacher
    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Integer id) {
        try {
            teacherService.deleteTeacher(id);
            return ResponseEntity.ok("Teacher deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTeachers", adminService.getTotalTeachers());
        stats.put("totalStudents", adminService.getTotalStudents());
        stats.put("todaysAttendancePercent", adminService.getTodaysAttendancePercent());
        return stats;
    }


}
