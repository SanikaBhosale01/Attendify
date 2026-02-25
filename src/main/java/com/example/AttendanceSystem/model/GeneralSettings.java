package com.example.AttendanceSystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "general_settings")
public class GeneralSettings {

    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private String instituteName = "ABC High School";

    @Column(nullable = false)
    private String timeZone = "IST";

    @Column(nullable = false)
    private String dateFormat = "dd/mm/yyyy";

    @Column(nullable = false)
    private String language = "en";

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInstituteName() { return instituteName; }
    public void setInstituteName(String instituteName) { this.instituteName = instituteName; }

    public String getTimeZone() { return timeZone; }
    public void setTimeZone(String timeZone) { this.timeZone = timeZone; }

    public String getDateFormat() { return dateFormat; }
    public void setDateFormat(String dateFormat) { this.dateFormat = dateFormat; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
