package com.returnX.admin_service.controller;

import com.returnX.admin_service.dto.AdminLoginRequest;
import com.returnX.admin_service.dto.AdminLoginResponse;
import com.returnX.admin_service.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {


    private final AdminAuthService adminAuthService;


    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request
    ){

        return ResponseEntity.ok(
                adminAuthService.login(request)
        );
    }
}