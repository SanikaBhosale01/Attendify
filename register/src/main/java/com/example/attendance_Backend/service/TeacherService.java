package com.example.attendance_Backend.service;

import com.example.attendance_Backend.dto.DateAnalyticsDTO;
import com.example.attendance_Backend.dto.SubjectAnalyticsDTO;
import com.example.attendance_Backend.model.Teacher;
import com.example.attendance_Backend.repository.AttendanceRepository;
import com.example.attendance_Backend.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    private final TeacherRepository repository;
    private final AttendanceRepository attendanceRepository;

    public Teacher registerTeacher(Teacher teacher) {
        return repository.save(teacher);
    }

    public boolean emailExists(String email) {
        return repository.existsByEmail(email);
    }


    public TeacherService(TeacherRepository repository, AttendanceRepository attendanceRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
    }

    public Optional<Teacher> login(String email, String password) {
        return repository.findByEmailAndPassword(email, password);
    }

    public Optional<Teacher> getTeacherByEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<SubjectAnalyticsDTO> getSubjectAnalytics() {
        return attendanceRepository.getSubjectAnalytics();
    }

    public List<SubjectAnalyticsDTO> getDepartmentAnalytics() {
        return attendanceRepository.getDepartmentAnalytics();
    }

    public List<DateAnalyticsDTO> getDateAnalytics() {
        return attendanceRepository.getDateAnalytics();
    }

    // -------------------------
    // Admin CRUD Methods (Add These)
    // -------------------------

    // Get all teachers (for admin dashboard)
    public List<Teacher> getAllTeachers() {
        return repository.findAll();
    }

    // Get teacher by ID
    public Optional<Teacher> getTeacherById(Integer id) {
        return repository.findById(id);
    }

    // Update teacher
    public Teacher updateTeacher(Integer id, Teacher teacherDetails) {
        Teacher teacher = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacher.setName(teacherDetails.getName());
        teacher.setDepartment(teacherDetails.getDepartment());
        teacher.setEmail(teacherDetails.getEmail());
        teacher.setMobilenumber(teacherDetails.getMobilenumber());
        teacher.setPassword(teacherDetails.getPassword());

        return repository.save(teacher);
    }

    // Delete teacher
    public void deleteTeacher(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Teacher not found");
        }
        repository.deleteById(id);
    }





}
