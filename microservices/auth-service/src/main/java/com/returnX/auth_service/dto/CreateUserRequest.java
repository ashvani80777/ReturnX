package com.returnX.auth_service.dto;

import lombok.Data;

@Data
public class CreateUserRequest {

    private Long authUserId;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String address;
}