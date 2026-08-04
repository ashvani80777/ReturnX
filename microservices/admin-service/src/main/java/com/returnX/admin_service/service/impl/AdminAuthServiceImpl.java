package com.returnX.admin_service.service.impl;

import com.returnX.admin_service.config.AdminProperties;
import com.returnX.admin_service.dto.AdminLoginRequest;
import com.returnX.admin_service.dto.AdminLoginResponse;
import com.returnX.admin_service.jwt.JwtService;
import com.returnX.admin_service.service.AdminAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthServiceImpl implements AdminAuthService {

    private final AdminProperties adminProperties;
    private final JwtService jwtService;

    @Override
    public AdminLoginResponse login(AdminLoginRequest request) {

        if(!adminProperties.getEmail().equals(request.getEmail())
                || !adminProperties.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid admin credentials");
        }

        String token = jwtService.generateToken(
                request.getEmail(),
                "ADMIN"
        );

        return AdminLoginResponse.builder()
                .token(token)
                .role("ADMIN")
                .message("Admin login successful")
                .build();
    }
}