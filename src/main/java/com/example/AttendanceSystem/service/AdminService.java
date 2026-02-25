package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.model.Teacher;
import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import com.example.AttendanceSystem.repository.TeacherRepository;
import com.example.AttendanceSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private TeacherRepository teacherRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AttendanceRepository attendanceRepo;

    public long getTotalTeachers() {
        return teacherRepo.count();
    }

    public long getTotalStudents() {
        return userRepo.count();
    }

    public int getTodaysAttendancePercent() {
        LocalDate today = LocalDate.now();
        int present = attendanceRepo.countPresentByDate(today);
        int total = attendanceRepo.countPresentByDate(today);
        return total == 0 ? 0 : (present * 100 / total);
    }

    public List<Teacher> getRecentTeachers(int limit) {
        return teacherRepo.findAll(PageRequest.of(0, limit, Sort.by("id").descending())).getContent();
    }

    public List<User> getRecentStudents(int limit) {
        return userRepo.findAll(PageRequest.of(0, limit, Sort.by("id").descending())).getContent();
    }
}
