package com.example.AttendanceSystem.dto;

public class StudentAttendanceDTO {

    private Integer id;
    private String rollNo;
    private String name;
    private String className;
    private String subject;
    private String status;

    public StudentAttendanceDTO(Integer id,
                                String rollNo,
                                String name,
                                String className,
                                String subject,
                                String status) {
        this.id = id;
        this.rollNo = rollNo;
        this.name = name;
        this.className = className;
        this.subject = subject;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public String getRollNo() {
        return rollNo;
    }

    public String getName() {
        return name;
    }

    public String getClassName() {
        return className;
    }

    public String getSubject() {
        return subject;
    }

    public String getStatus() {
        return status;
    }
}