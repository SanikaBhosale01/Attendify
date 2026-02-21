package com.example.attendance_Backend.controller;

import com.example.attendance_Backend.model.Teacher;
import com.example.attendance_Backend.service.TeacherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*") // allow CORS for frontend
public class TeacherController {

    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {

        // Check if email already exists
        if (service.emailExists(teacher.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Email already registered"));
        }

        Teacher savedTeacher = service.registerTeacher(teacher);

        return ResponseEntity.ok(new ApiResponse(true, "Registration successful"));
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody LoginRequest request) {
        return service.login(request.getEmail(), request.getPassword())
                .map(teacher -> ResponseEntity.ok().body((Object) teacher)) // cast to Object
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid email or password"));
    }

    @GetMapping("/{email:.+}")
    public ResponseEntity<?> getTeacherByEmail(@PathVariable String email) {
        return service.getTeacherByEmail(email)
                .map(teacher -> ResponseEntity.ok().body((Object) teacher))
                .orElseGet(() -> ResponseEntity.status(404).body("Teacher not found"));
    }

    // DTO for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class ApiResponse {
        private boolean success;
        private String message;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
    }
}
