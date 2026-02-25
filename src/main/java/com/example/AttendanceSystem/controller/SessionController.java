package com.example.AttendanceSystem.controller;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.AttendanceSystem.model.AttendanceSession;
import com.example.AttendanceSystem.repository.AttendanceSessionRepository;

@RestController
@RequestMapping("/api/session")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private AttendanceSessionRepository sessionRepository;

    @PostMapping("/create")
    public Map<String, String> createSession(@RequestBody Map<String, Object> data) {

        AttendanceSession session = new AttendanceSession();

        session.setSubject((String) data.get("subject"));

        session.setTeacherLat((Double) data.get("teacherLat"));
        session.setTeacherLng((Double) data.get("teacherLng"));

        int duration = (Integer) data.get("duration");

        session.setExpiryTime(LocalDateTime.now().plusMinutes(duration));

        sessionRepository.save(session);

        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());

        return response;
    }
}
