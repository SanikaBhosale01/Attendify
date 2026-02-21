package com.example.attendance_Backend.service;

import com.example.attendance_Backend.dto.AttendanceDTO;
import com.example.attendance_Backend.dto.DashboardDTO;
import com.example.attendance_Backend.model.User;
import com.example.attendance_Backend.repository.AttendanceRepository;
import com.example.attendance_Backend.repository.UserRepository;
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
}
