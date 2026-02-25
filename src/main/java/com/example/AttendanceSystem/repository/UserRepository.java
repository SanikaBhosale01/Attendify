package com.example.AttendanceSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AttendanceSystem.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByRollNo(String rollNo);
    List<User> findByClassName(String className);
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findByClassNameIsNotNull();

}
