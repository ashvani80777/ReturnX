package com.returnX.user_service.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {

    private Long authUserId;

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50)
    private String lastName;

    @Size(max = 30)
    private String employeeId;

    @Size(max = 100)
    private String department;

    @Size(max = 100)
    private String designation;

    @Size(max = 20)
    private String phoneNumber;

    private String profileImage;

    @Size(max = 500)
    private String address;

    @Size(max = 1000)
    private String bio;

    @Size(max = 1000)
    private String preferences;
}