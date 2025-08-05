package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.processing.Pattern;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("UserId")
    private int id;

    @JsonProperty("Full Name")
    private String fullName;

//    @JsonProperty("Password")
    private String password;

    @Transient  // not stored in DB
    private String confirmPassword;

//    @JsonProperty("Email")
    private String email;


    @JsonProperty("Mobile Number")
    private long mobileNumber;

    @Enumerated(EnumType.STRING)
    @JsonProperty("Role")
    private Role role;

    private String salt;

    public enum Role {
        ADMIN, TUTOR, STUDENT
    }

    public User(int id, String fullName, String password, String confirmPassword, String email, long mobileNumber, Role role) {
        this.id = id;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.role = role;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public User() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


