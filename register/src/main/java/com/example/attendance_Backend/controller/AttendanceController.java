package com.example.attendance_Backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance_Backend.dto.AttendanceDTO;
import com.example.attendance_Backend.dto.DateAnalyticsDTO;
import com.example.attendance_Backend.dto.StudentAttendanceDTO;
import com.example.attendance_Backend.dto.SubjectAnalyticsDTO;
import com.example.attendance_Backend.model.Attendance;
import com.example.attendance_Backend.model.User;
import com.example.attendance_Backend.model.AttendanceSession;
import com.example.attendance_Backend.repository.AttendanceRepository;
import com.example.attendance_Backend.repository.AttendanceSessionRepository;
import com.example.attendance_Backend.repository.UserRepository;
import com.example.attendance_Backend.service.TeacherAttendanceService;
import com.example.attendance_Backend.service.TeacherService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private AttendanceSessionRepository sessionRepository;

    private final TeacherAttendanceService attendanceService;

    public AttendanceController(TeacherAttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // 1️⃣ STUDENT MARKS ATTENDANCE
    @PostMapping("/mark")
    public Map<String, String> markAttendance(
            @RequestParam String rollNo,
            @RequestParam String subject,
            @RequestParam String deviceId
    ) {
        Map<String, String> response = new HashMap<>();
        User user = userRepository.findByRollNo(rollNo).orElse(null);
        if (user == null) {
            response.put("message", "Invalid Roll Number");
            return response;
        }
        LocalDate today = LocalDate.now();
        // 🔒 Block same device
        boolean deviceUsed
                = attendanceRepository.existsByDeviceIdAndDateAndSubject(
                        deviceId, today, subject);
        if (deviceUsed) {
            response.put("message", "Attendance already marked from this device ❌");
            return response;
        }
        // 🔁 Block same student
        boolean alreadyMarked
                = attendanceRepository.existsByUser_IdAndDateAndSubject(
                        user.getId(), today, subject);
        if (alreadyMarked) {
            response.put("message", "Attendance already marked");
            return response;
        }
        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setSubject(subject);
        attendance.setDate(today);
        attendance.setStatus("Present");
        attendance.setDeviceId(deviceId); // ✅ save device
        attendanceRepository.save(attendance);
        response.put("message", "Attendance marked successfully ✅");
        return response;
    }
    // @PostMapping("/mark")
    // public Map<String, String> markAttendance(
    //         @RequestParam String rollNo,
    //         @RequestParam String deviceId,
    //         @RequestParam double latitude,
    //         @RequestParam double longitude,
    //         @RequestParam String sessionId
    // ) {

    //     Map<String, String> response = new HashMap<>();
    //     User user = userRepository.findByRollNo(rollNo).orElse(null);
    //     if (user == null) {
    //         response.put("message", "Invalid Roll Number");
    //         return response;
    //     }
    //     AttendanceSession session
    //             = sessionRepository.findById(sessionId).orElse(null);
    //     if (session == null) {
    //         response.put("message", "Invalid QR session ❌");
    //         return response;
    //     }
    //     // ⏳ Expiry check
    //     if (session.getExpiryTime().isBefore(LocalDateTime.now())) {
    //         response.put("message", "QR expired ❌");
    //         return response;
    //     }
    //     double teacherLat = session.getTeacherLat();
    //     double teacherLng = session.getTeacherLng();
    //     double distance
    //             = calculateDistance(teacherLat, teacherLng, latitude, longitude);
    //     if (distance > 0.1) { // 100 meters
    //         response.put("message", "You are outside classroom range ❌");
    //         return response;
    //     }
    //     LocalDate today = LocalDate.now();
    //     boolean alreadyMarked
    //             = attendanceRepository.existsByUser_IdAndDateAndSubject(
    //                     user.getId(), today, session.getSubject());
    //     if (alreadyMarked) {
    //         response.put("message", "Attendance already marked");
    //         return response;
    //     }
    //     Attendance attendance = new Attendance();
    //     attendance.setUser(user);
    //     attendance.setSubject(session.getSubject());
    //     attendance.setDate(today);
    //     attendance.setStatus("Present");
    //     attendance.setDeviceId(deviceId);
    //     attendanceRepository.save(attendance);
    //     response.put("message", "Attendance marked successfully ✅");
    //     return response;
    // }
    // private double calculateDistance(double lat1, double lon1,
    //         double lat2, double lon2) {
    //     final int R = 6371; // Earth radius in KM
    //     double latDistance = Math.toRadians(lat2 - lat1);
    //     double lonDistance = Math.toRadians(lon2 - lon1);
    //     double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
    //             + Math.cos(Math.toRadians(lat1))
    //             * Math.cos(Math.toRadians(lat2))
    //             * Math.sin(lonDistance / 2)
    //             * Math.sin(lonDistance / 2);
    //     double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     return R * c; // returns distance in KM
    // }
    // 2️⃣ TEACHER FINALIZE (MARK ABSENT)
    @PostMapping("/finalize")
    public String finalizeAttendance(
            @RequestParam String subject,
            @RequestParam String className
    ) {
        LocalDate today = LocalDate.now();
        List<User> students = userRepository.findByClassName(className);

        for (User user : students) {

            boolean alreadyMarked
                    = attendanceRepository.existsByUser_IdAndDateAndSubject(
                            user.getId(), today, subject);

            if (!alreadyMarked) {
                Attendance attendance = new Attendance();
                attendance.setUser(user);
                attendance.setSubject(subject);
                attendance.setDate(today);
                attendance.setStatus("Absent");

                attendanceRepository.save(attendance);
            }
        }
        return "Attendance finalized successfully";
    }

    //TEACHER VIEW
    @GetMapping("/teacher")
    public List<AttendanceDTO> teacherAttendance(
            @RequestParam String subject
    ) {
        return attendanceRepository.attendanceListForTeacher(subject);
    }

    @GetMapping("/teacher/student-list")
    public List<StudentAttendanceDTO> studentTab() {
        return attendanceRepository.getStudentTabData();
    }

    @GetMapping("/report")
    public List<AttendanceDTO> generateReport(
            @RequestParam String className
    ) {
        return attendanceRepository.attendanceReportByClass(className);
    }

    @GetMapping("/analytics/subject")
    public List<SubjectAnalyticsDTO> getSubjectAnalytics() {
        return teacherService.getSubjectAnalytics();
    }

    @GetMapping("/analytics/department")
    public List<SubjectAnalyticsDTO> departmentAnalytics() {
        return teacherService.getDepartmentAnalytics();
    }

    @GetMapping("/analytics/date")
    public List<DateAnalyticsDTO> dateAnalytics() {
        return teacherService.getDateAnalytics();
    }

    @GetMapping("/check/{id}")
    public String checkAttendance(@PathVariable int id) {
        return attendanceService.checkAttendanceAndNotify(id);
    }

    @PostMapping("/manual")
    public Map<String, String> markManualAttendance(
            @RequestParam String rollNo,
            @RequestParam String subject,
            @RequestParam String status
    ) {

        Map<String, String> response = new HashMap<>();

        Optional<User> studentOptional = userRepository.findByRollNo(rollNo);

        if (studentOptional.isEmpty()) {
            response.put("message", "Student not found ❌");
            return response;
        }

        User student = studentOptional.get();
        LocalDate today = LocalDate.now();

        // Check if already marked
        boolean alreadyMarked
                = attendanceRepository.existsByUserAndSubjectAndDate(
                        student, subject, today);

        if (alreadyMarked) {
            response.put("message", "Attendance already marked for today ❌");
            return response;
        }

        Attendance attendance = new Attendance();
        attendance.setUser(student);
        attendance.setSubject(subject);
        attendance.setDate(today);
        attendance.setStatus(status); // Present or Absent
        attendance.setDeviceId("MANUAL"); // mark as manual entry

        attendanceRepository.save(attendance);

        response.put("message", "Manual attendance saved successfully ✅");
        return response;
    }
}
