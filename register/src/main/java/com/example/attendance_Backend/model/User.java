package com.example.attendance_Backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    @Column(name = "roll_no")
    private String rollNo;
    @Column(name = "class_name")
    private String className;
    private String mobilenumber;
    private String address;

    private String email;
    private String password;


    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Attendance> attendances;
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRollNo() {
        return rollNo;
    }

    public String getMobilenumber() {return mobilenumber;}

    public void setMobilenumber(String mobilenumber) {this.mobilenumber = mobilenumber;}

    public String getAddress() {return address; }

    public void setAddress(String address) {this.address = address; }
    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }
    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
