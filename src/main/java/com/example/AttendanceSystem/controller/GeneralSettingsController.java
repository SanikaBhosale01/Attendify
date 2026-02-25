package com.example.AttendanceSystem.controller;

import com.example.AttendanceSystem.model.GeneralSettings;
import com.example.AttendanceSystem.repository.GeneralSettingsRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class GeneralSettingsController {

    private final GeneralSettingsRepository repo;

    public GeneralSettingsController(GeneralSettingsRepository repo) {
        this.repo = repo;
    }

    // GET: Load settings
    @GetMapping("/general")
    public GeneralSettings getSettings() {
        return repo.findById(1L).orElseGet(() -> {
            GeneralSettings s = new GeneralSettings(); // uses defaults
            s.setId(1L);
            return repo.save(s);
        });
    }

    // PUT: Save/update settings
    @PutMapping("/general")
    public GeneralSettings saveSettings(@RequestBody GeneralSettings settings) {
        GeneralSettings existing = repo.findById(1L).orElseGet(() -> {
            GeneralSettings s = new GeneralSettings();
            s.setId(1L);
            return s;
        });

        // Update fields
        existing.setInstituteName(settings.getInstituteName());
        existing.setTimeZone(settings.getTimeZone());
        existing.setDateFormat(settings.getDateFormat());
        existing.setLanguage(settings.getLanguage());

        return repo.save(existing);
    }
}
