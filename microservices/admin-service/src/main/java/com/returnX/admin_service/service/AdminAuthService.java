package com.returnX.admin_service.service;

import com.returnX.admin_service.dto.AdminLoginRequest;
import com.returnX.admin_service.dto.AdminLoginResponse;

public interface AdminAuthService {

    AdminLoginResponse login(AdminLoginRequest request);

}