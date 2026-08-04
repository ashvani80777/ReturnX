package com.returnX.admin_service.dto;

import lombok.Data;

@Data
public class UserResponse {

    private Long id;

    private Long authUserId;

    private String firstName;

    private String lastName;

    private String email;

    private String employeeId;

    private String department;

    private String designation;

    private String phoneNumber;

    private String profileImage;

    private String address;

    private String bio;

    private String preferences;

    private String profileStatus;

    private Boolean deleted;
}