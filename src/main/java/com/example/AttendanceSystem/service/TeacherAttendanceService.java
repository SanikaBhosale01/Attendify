package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.dto.AttendanceDTO;
import com.example.AttendanceSystem.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherAttendanceService {

    private final AttendanceRepository repository;

    public TeacherAttendanceService(AttendanceRepository repository) {
        this.repository = repository;
    }

    // Get attendance for a specific subject (teacher view)
    public List<AttendanceDTO> getAttendanceBySubject(String subject) {
        return repository.attendanceListForTeacher(subject);
    }

    public String checkAttendanceAndNotify(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'checkAttendanceAndNotify'");
    }
}
