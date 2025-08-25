package com.learningmanagement.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "`user`") // explicit, since `user` is reserved in MySQL
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id", unique = true)
    private String userId;

    @Column(name = "approved", nullable = false)
    private boolean approved = false;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "password")
    private String password;

    @Transient
    private String confirmPassword;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "mobile_number", nullable = false)
    private long mobileNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "salt")
    private String salt;


    public enum Role { ADMIN, TEACHER, STUDENT }

    public User() {}

    public User(String userId, String fullName, String password,
                String confirmPassword, String email,
                long mobileNumber, Role role) {
        this.userId = userId;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.role = role;
    }

    // getters/setters...

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isApproved() {
        return approved;
    }
    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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

    public String getSalt() {
        return salt;
    }
    public void setSalt(String salt) {
        this.salt = salt;
    }
}
