package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.dto.AttendanceDTO;
import com.example.AttendanceSystem.dto.DashboardDTO;
import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import com.example.AttendanceSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudAttendanceService {

    private final AttendanceRepository repository;
    private final UserRepository userRepository;

    public StudAttendanceService(AttendanceRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    // =========================
    // Dashboard / Attendance
    // =========================
    public int getTotalClasses(int userId) {
        return repository.totalClasses(userId);
    }

    public int getPresentClasses(int userId) {
        return repository.presentCount(userId);
    }

    public List<AttendanceDTO> getAttendanceList(int userId) {
        return repository.attendanceList(userId);
    }

    public int getAbsentClasses(int userId) {
        return repository.absentCount(userId);
    }

    public DashboardDTO getDashboardData(int userId) {
        int total = repository.totalClasses(userId);
        int present = repository.presentCount(userId);
        int absent = repository.absentCount(userId);
        int percentage = total == 0 ? 0 : (present * 100) / total;

        return new DashboardDTO(total, present, absent, percentage);
    }

    public DashboardDTO getDashboardData(int total, int present, int absent, int percentage) {
        return new DashboardDTO(total, present, absent, percentage);
    }

    // =========================
    // Student CRUD
    // =========================

    // Get all students
    public List<User> getAllStudents() {
        return userRepository.findByClassNameIsNotNull();
    }

    // Get student by rollNo
    public Optional<User> getStudentByRollNo(String rollNo) {
        return userRepository.findByRollNo(rollNo);
    }

    // Save new student
    public User saveStudent(User student) {
        return userRepository.save(student);
    }

    // Update student
    public Optional<User> updateStudent(String rollNo, User updatedStudent) {
        return userRepository.findByRollNo(rollNo).map(student -> {
            student.setName(updatedStudent.getName());
            student.setClassName(updatedStudent.getClassName());
            student.setEmail(updatedStudent.getEmail());
            student.setMobilenumber(updatedStudent.getMobilenumber());
            student.setAddress(updatedStudent.getAddress());
            return userRepository.save(student);
        });
    }

    // Delete student
    public boolean deleteStudent(String rollNo) {
        return userRepository.findByRollNo(rollNo).map(student -> {
            userRepository.delete(student);
            return true;
        }).orElse(false);
    }

    public boolean changePassword(int studentId, String oldPassword, String newPassword) {

    User student = userRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    if (!student.getPassword().equals(oldPassword)) {
        return false;
    }

    student.setPassword(newPassword);
    userRepository.save(student);

    return true;
}
}
