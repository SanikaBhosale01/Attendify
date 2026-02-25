package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.dto.DateAnalyticsDTO;
import com.example.AttendanceSystem.dto.SubjectAnalyticsDTO;
import com.example.AttendanceSystem.model.Teacher;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import com.example.AttendanceSystem.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    private final TeacherRepository repository;
    private final AttendanceRepository attendanceRepository;

    public TeacherService(TeacherRepository repository,
                          AttendanceRepository attendanceRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
    }

    /* ================= REGISTER ================= */

    public Teacher registerTeacher(Teacher teacher) {
        return repository.save(teacher);
    }

    public boolean emailExists(String email) {
        return repository.existsByEmail(email);
    }

    /* ================= LOGIN ================= */

    public Optional<Teacher> login(String email, String password) {
        return repository.findByEmailAndPassword(email, password);
    }

    public Optional<Teacher> getTeacherByEmail(String email) {
        return repository.findByEmail(email);
    }

    /* ================= UPDATE ================= */

    public Optional<Teacher> updateTeacher(Integer id, Teacher teacherDetails) {

        return repository.findById(id).map(teacher -> {

            teacher.setName(teacherDetails.getName());
            teacher.setDepartment(teacherDetails.getDepartment());
            teacher.setEmail(teacherDetails.getEmail());
            teacher.setMobilenumber(teacherDetails.getMobilenumber());

            return repository.save(teacher);
        });
    }

    /* ================= CHANGE PASSWORD ================= */

    public boolean changePassword(Integer id,
                                  String oldPassword,
                                  String newPassword) {

        Optional<Teacher> optionalTeacher = repository.findById(id);

        if (optionalTeacher.isEmpty()) {
            return false;
        }

        Teacher teacher = optionalTeacher.get();

        // Check old password
        if (!teacher.getPassword().equals(oldPassword)) {
            return false;
        }

        teacher.setPassword(newPassword);
        repository.save(teacher);

        return true;
    }

    /* ================= RESET PASSWORD ================= */

    public boolean resetPassword(String email, String newPassword) {

        Optional<Teacher> optionalTeacher = repository.findByEmail(email);

        if (optionalTeacher.isEmpty()) {
            return false;
        }

        Teacher teacher = optionalTeacher.get();
        teacher.setPassword(newPassword);

        repository.save(teacher);

        return true;
    }

    /* ================= ANALYTICS ================= */

    public List<SubjectAnalyticsDTO> getSubjectAnalytics() {
        return attendanceRepository.getSubjectAnalytics();
    }

    public List<SubjectAnalyticsDTO> getDepartmentAnalytics() {
        return attendanceRepository.getDepartmentAnalytics();
    }

    public List<DateAnalyticsDTO> getDateAnalytics() {
        return attendanceRepository.getDateAnalytics();
    }

    /* ================= ADMIN ================= */

    public List<Teacher> getAllTeachers() {
        return repository.findAll();
    }

    public Optional<Teacher> getTeacherById(Integer id) {
        return repository.findById(id);
    }

    public void deleteTeacher(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Teacher not found");
        }
        repository.deleteById(id);
    }
}