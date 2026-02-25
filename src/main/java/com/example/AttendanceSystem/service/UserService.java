package com.example.AttendanceSystem.service;

import com.example.AttendanceSystem.model.User;
import com.example.AttendanceSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // CHECK EMAIL
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // RESET PASSWORD
    public boolean resetPassword(String email, String newPassword) {

        Optional<User> studentOpt = userRepository.findByEmail(email);

        if (studentOpt.isPresent()) {
            User student = studentOpt.get();
            student.setPassword(newPassword);
            userRepository.save(student);
            return true;
        }

        return false;
    }
}

