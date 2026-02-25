package com.example.AttendanceSystem.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.AttendanceSystem.dto.AttendanceDTO;
import com.example.AttendanceSystem.dto.DateAnalyticsDTO;
import com.example.AttendanceSystem.dto.StudentAttendanceDTO;
import com.example.AttendanceSystem.dto.SubjectAnalyticsDTO;
import com.example.AttendanceSystem.model.Attendance;
import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import com.example.AttendanceSystem.repository.UserRepository;
import com.example.AttendanceSystem.service.TeacherAttendanceService;
import com.example.AttendanceSystem.service.TeacherService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    private final TeacherAttendanceService attendanceService;
    private final TeacherService teacherService;

    public AttendanceController(TeacherAttendanceService attendanceService, TeacherService teacherService) {
        this.attendanceService = attendanceService;
        this.teacherService = teacherService;
    }

    // 1️⃣ Student marks attendance
    @PostMapping("/mark")
    public Map<String, String> markAttendance(
            @RequestParam String rollNo,
            @RequestParam String subject,
            @RequestParam String deviceId
    ) {
        Map<String, String> response = new HashMap<>();
        User user = userRepository.findByRollNo(rollNo).orElse(null);
        if (user == null) {
            response.put("message", "Invalid Roll Number ❌");
            return response;
        }

        LocalDate today = LocalDate.now();

        // Prevent same device marking
        boolean deviceUsed = attendanceRepository.existsByDeviceIdAndDateAndSubject(deviceId, today, subject);
        if (deviceUsed) {
            response.put("message", "Attendance already marked from this device ❌");
            return response;
        }

        // Prevent same student marking
        boolean alreadyMarked = attendanceRepository.existsByUser_IdAndDateAndSubject(user.getId(), today, subject);
        if (alreadyMarked) {
            response.put("message", "Attendance already marked ✅");
            return response;
        }

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setSubject(subject);
        attendance.setDate(today);
        attendance.setStatus("Present");
        attendance.setDeviceId(deviceId);

        attendanceRepository.save(attendance);
        response.put("message", "Attendance marked successfully ✅");

        return response;
    }

    // 2️⃣ Teacher finalize attendance
    @PostMapping("/finalize")
    public String finalizeAttendance(
            @RequestParam String subject,
            @RequestParam String className
    ) {
        LocalDate today = LocalDate.now();
        List<User> students = userRepository.findByClassName(className);

        for (User user : students) {
            boolean alreadyMarked = attendanceRepository.existsByUser_IdAndDateAndSubject(user.getId(), today, subject);
            if (!alreadyMarked) {
                Attendance attendance = new Attendance();
                attendance.setUser(user);
                attendance.setSubject(subject);
                attendance.setDate(today);
                attendance.setStatus("Absent");
                attendanceRepository.save(attendance);
            }
        }
        return "Attendance finalized successfully ✅";
    }

    // 3️⃣ Teacher view attendance
    @GetMapping("/teacher")
    public List<AttendanceDTO> teacherAttendance(@RequestParam String subject) {
        return attendanceRepository.attendanceListForTeacher(subject);
    }

    @GetMapping("/teacher/student-list")
    public List<StudentAttendanceDTO> studentTab() {
        return attendanceRepository.getStudentTabData();
    }

    @GetMapping("/report")
    public List<AttendanceDTO> generateReport(@RequestParam String className) {
        return attendanceRepository.attendanceReportByClass(className);
    }

    @GetMapping("/analytics/subject")
public List<SubjectAnalyticsDTO> analyticsBySubject() {
    return attendanceRepository.getSubjectAnalytics();
}

@GetMapping("/analytics/department")
public List<SubjectAnalyticsDTO> analyticsByDepartment() {
    return attendanceRepository.getDepartmentAnalytics();
}

@GetMapping("/analytics/date")
public List<DateAnalyticsDTO> analyticsByDate() {
    return attendanceRepository.getDateAnalytics();
}
}