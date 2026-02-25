package com.example.AttendanceSystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.AttendanceSystem.model.Setting;
import com.example.AttendanceSystem.repository.SettingRepository;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin
public class SettingController {

    private final SettingRepository settingRepository;

    public SettingController(SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    // Save or Update Settings
    @PostMapping("/save")
    public Setting saveSettings(@RequestBody Setting newSetting) {

        newSetting.setId(1L);   // 🔥 IMPORTANT

        return settingRepository.save(newSetting);
    }

    // Get Settings
    @GetMapping
    public Setting getSettings() {
        return settingRepository.findById(1L)
                .orElseGet(() -> {
                    Setting defaultSetting = new Setting();
                    defaultSetting.setId(1L);
                    defaultSetting.setAttendanceThreshold(75);
                    defaultSetting.setLateArrivalMinutes(10);
                    defaultSetting.setAutoMarkAbsentMinutes(30);
                    defaultSetting.setManualOverride(false);
                    defaultSetting.setSendAlerts(false);
                    return settingRepository.save(defaultSetting);
                });
    }

}
