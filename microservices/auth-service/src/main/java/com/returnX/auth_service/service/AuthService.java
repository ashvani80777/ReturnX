package com.returnX.auth_service.service;

import com.returnX.auth_service.dto.*;

public interface AuthService {
    void register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserResponse getCurrentUser();
    void changePassword(ChangePasswordRequest request);
    void logout();
    public void deleteUser(Long id);
}
