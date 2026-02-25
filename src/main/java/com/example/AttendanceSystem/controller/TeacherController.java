package com.example.AttendanceSystem.controller;

import com.example.AttendanceSystem.dto.ChangePasswordDTO;
import com.example.AttendanceSystem.model.Teacher;
import com.example.AttendanceSystem.service.TeacherService;
import com.example.AttendanceSystem.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    private final TeacherService service;
    private final UserService userService;

    // ✅ Constructor Injection (VERY IMPORTANT)
    public TeacherController(TeacherService service,UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    /* ===============================
    REGISTER
    ================================ */
    @PostMapping("/register")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {

        teacher.setEmail(teacher.getEmail().trim().toLowerCase());

        if (service.emailExists(teacher.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Email already registered"));
        }

        service.registerTeacher(teacher);

        return ResponseEntity.ok(new ApiResponse(true, "Registration successful"));
    }

    /* ===============================
       LOGIN
    ================================ */
    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        return service.login(email, request.getPassword())
                .map(teacher -> ResponseEntity.ok((Object) teacher))
                .orElseGet(() -> ResponseEntity
                        .status(401)
                        .body("Invalid email or password"));
    }

    /* ===============================
       GET BY EMAIL
    ================================ */
    @GetMapping("/{email:.+}")
    public ResponseEntity<?> getTeacherByEmail(@PathVariable String email) {

        email = email.trim().toLowerCase();

        return service.getTeacherByEmail(email)
                .map(teacher -> ResponseEntity.ok((Object) teacher))
                .orElseGet(() -> ResponseEntity
                        .status(404)
                        .body("Teacher not found"));
    }

    /* ===============================
       UPDATE PROFILE
    ================================ */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTeacher(
            @PathVariable Integer id,
            @RequestBody Teacher teacher) {

        return service.updateTeacher(id, teacher)
                .map(updated -> ResponseEntity.ok(updated))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /* ================= CHANGE PASSWORD ================= */
@PutMapping("/change-password/{id}")
public ResponseEntity<?> changePassword(
        @PathVariable Integer id,
        @RequestBody ChangePasswordDTO request) {

    boolean success = service.changePassword(
            id,
            request.getOldPassword(),
            request.getNewPassword()
    );

    if (!success) {
        return ResponseEntity
                .badRequest()
                .body("Old password incorrect or teacher not found");
    }

    return ResponseEntity.ok("Password changed successfully");
}


/* ================= RESET PASSWORD ================= */
@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(
        @RequestBody Map<String, String> request) {

    String email = request.get("email").trim().toLowerCase();
    String newPassword = request.get("newPassword");

    boolean updated = false;

    if (service.emailExists(email)) {
        updated = service.resetPassword(email, newPassword);
    }
    else if (userService.emailExists(email)) {
        updated = userService.resetPassword(email, newPassword);
    }

    if (updated) {
        return ResponseEntity.ok("Password updated successfully");
    } else {
        return ResponseEntity.badRequest().body("Email not found");
    }
}

    /* ===============================
       DTO CLASSES
    ================================ */

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