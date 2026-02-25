package com.example.AttendanceSystem.controller;

import com.example.AttendanceSystem.dto.StudentAttendanceDTO;
import com.example.AttendanceSystem.model.Attendance;
import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import com.example.AttendanceSystem.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class TeacherStudentController {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    public TeacherStudentController(AttendanceRepository attendanceRepository, UserRepository userRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
    }

    // ✅ Get All Students
    @GetMapping
    public List<User> getAllStudents() {
        return userRepository.findAll();
    }

    // ✅ View Single Student by ID
    @GetMapping("/{id}")
    public User getStudentById(@PathVariable int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // ✅ View Single Student by RollNo
    @GetMapping("/rollno/{rollNo}")
    public User getStudentByRollNo(@PathVariable String rollNo) {
        return userRepository.findByRollNo(rollNo)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // ✅ Update Student Attendance by RollNo
    @PutMapping("/teacher/update/{rollNo}")
    public ResponseEntity<?> updateStudent(
            @PathVariable String rollNo,
            @RequestBody StudentAttendanceDTO dto) {

        Optional<Attendance> optionalAttendance = attendanceRepository.findByRollNo(rollNo);

        if (optionalAttendance.isEmpty()) {
            return ResponseEntity.badRequest().body("Attendance record not found");
        }

        Attendance attendance = optionalAttendance.get();
        attendance.setSubject(dto.getSubject());
        attendance.setStatus(dto.getStatus());

        attendanceRepository.save(attendance);

        return ResponseEntity.ok("Updated successfully");
    }


    // ✅ Delete Student by ID
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Student not found");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    // ✅ Add New Student
    @PostMapping("/add-student")
    public ResponseEntity<String> addStudent(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByRollNo(user.getRollNo());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Roll number already exists");
        }

        userRepository.save(user);
        return ResponseEntity.ok("Student added successfully");
    }
}
