package com.example.attendance_Backend.service;

import com.example.attendance_Backend.dto.AttendanceDTO;
import com.example.attendance_Backend.model.Setting;
import com.example.attendance_Backend.repository.AttendanceRepository;
import com.example.attendance_Backend.repository.SettingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherAttendanceService {

    private final AttendanceRepository repository;
    private final AttendanceRepository attendanceRepository;
    private final SettingRepository settingRepository;

    public TeacherAttendanceService(AttendanceRepository repository, AttendanceRepository attendanceRepository, SettingRepository settingRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
        this.settingRepository = settingRepository;
    }

    // Get attendance for a specific subject (teacher view)
    public List<AttendanceDTO> getAttendanceBySubject(String subject) {
        return repository.attendanceListForTeacher(subject);
    }

    public String checkAttendanceAndNotify(int id) {

        long totalClasses = attendanceRepository.countByUserId(id);
        long presentClasses = attendanceRepository.countByUserIdAndStatus(id, "PRESENT");

        if (totalClasses == 0) {
            return "No attendance records found.";
        }

        double percentage = (presentClasses * 100.0) / totalClasses;

        Setting setting = settingRepository.findById(1L).orElseThrow();

        if (percentage < setting.getAttendanceThreshold()) {
            return "⚠ Warning: Your attendance is below "
                    + setting.getAttendanceThreshold() + "%";
        } else {
            return "✅ Attendance is safe.";
        }
    }


}
