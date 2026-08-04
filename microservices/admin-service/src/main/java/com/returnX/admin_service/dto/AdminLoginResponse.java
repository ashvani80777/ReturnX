package com.returnX.admin_service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminLoginResponse {

    private String token;
    private String role;
    private String message;
}