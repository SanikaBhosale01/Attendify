package com.example.attendance_Backend.controller;

import com.example.attendance_Backend.model.Setting;
import com.example.attendance_Backend.repository.SettingRepository;
import org.springframework.web.bind.annotation.*;

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
