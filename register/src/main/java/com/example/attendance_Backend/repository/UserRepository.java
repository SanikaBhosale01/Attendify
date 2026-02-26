package com.example.attendance_Backend.repository;

import com.example.attendance_Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByRollNo(String rollNo);

    List<User> findByClassName(String className);

    List<User> findByClassNameIsNotNull();

}
