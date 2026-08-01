package com.returnX.user_service.service;

import com.returnX.user_service.dto.request.CreateUserRequest;
import com.returnX.user_service.dto.request.UpdateUserRequest;
import com.returnX.user_service.dto.response.UserResponse;
import org.springframework.data.domain.Page;

public interface UserService {

    UserResponse createProfile(CreateUserRequest request);

    UserResponse getProfile(Long authUserId);

    UserResponse getUserById(Long id);

    Page<UserResponse> getAllUsers(int page, int size, String sortBy, String sortDir
    );

    UserResponse updateProfile(Long id, UpdateUserRequest request);

    void deleteProfile(Long id);

    Page<UserResponse> searchUsers(
            String keyword,
            int page,
            int size,
            String sortBy,
            String sortDir
    );
}