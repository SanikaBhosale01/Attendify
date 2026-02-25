package com.example.AttendanceSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Setting {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    private int attendanceThreshold;
    private int lateArrivalMinutes;
    private int autoMarkAbsentMinutes;
    private boolean manualOverride;
    private boolean sendAlerts;

    // Getters & Setters
    public Long getId() { return id; }

    public int getAttendanceThreshold() { return attendanceThreshold; }
    public void setAttendanceThreshold(int attendanceThreshold) {
        this.attendanceThreshold = attendanceThreshold;
    }

    public int getLateArrivalMinutes() { return lateArrivalMinutes; }
    public void setLateArrivalMinutes(int lateArrivalMinutes) {
        this.lateArrivalMinutes = lateArrivalMinutes;
    }

    public int getAutoMarkAbsentMinutes() { return autoMarkAbsentMinutes; }
    public void setAutoMarkAbsentMinutes(int autoMarkAbsentMinutes) {
        this.autoMarkAbsentMinutes = autoMarkAbsentMinutes;
    }

    public boolean isManualOverride() { return manualOverride; }
    public void setManualOverride(boolean manualOverride) {
        this.manualOverride = manualOverride;
    }

    public boolean isSendAlerts() { return sendAlerts; }
    public void setSendAlerts(boolean sendAlerts) {
        this.sendAlerts = sendAlerts;
    }
}
