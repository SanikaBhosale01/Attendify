package com.example.attendance_Backend.controller;

import com.example.attendance_Backend.model.Teacher;
import com.example.attendance_Backend.model.User;
import com.example.attendance_Backend.service.AdminService;
import com.example.attendance_Backend.service.TeacherAttendanceService;
import com.example.attendance_Backend.service.TeacherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.attendance_Backend.model.Admin;
import com.example.attendance_Backend.repository.AdminRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final TeacherService teacherService;
    private final AdminService adminService;
    private final AdminRepository adminRepository;

    public AdminController(TeacherService teacherService, AdminService adminService, com.example.attendance_Backend.repository.AdminRepository adminRepository) {
        this.teacherService = teacherService;
        this.adminService = adminService;
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);

        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Admin not found"));
        }

        Admin admin = optionalAdmin.get();

        if (!admin.getPassword().equals(password)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid password"));
        }

        return ResponseEntity.ok(Map.of(
                "id", admin.getId(),
                "name", admin.getName(),
                "email", admin.getEmail(),
                "role", "admin"
        ));
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
