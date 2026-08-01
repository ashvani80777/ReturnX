package com.returnX.user_service.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {

    private Long id;
    private Long authUserId;
    private String firstName;
    private String lastName;
    private String employeeId;
    private String department;
    private String designation;
    private String phoneNumber;
    private String profileImage;
    private String address;
    private String bio;
    private String preferences;
    private String profileStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}