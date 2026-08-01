package com.returnX.user_service.mapper;


import com.returnX.user_service.dto.request.CreateUserRequest;
import com.returnX.user_service.dto.request.UpdateUserRequest;
import com.returnX.user_service.dto.response.UserResponse;
import com.returnX.user_service.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(CreateUserRequest request){
        return User.builder()
                .authUserId(request.getAuthUserId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .employeeId(request.getEmployeeId())
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .phoneNumber(request.getPhoneNumber())
                .profileImage(request.getProfileImage())
                .address(request.getAddress())
                .bio(request.getBio())
                .preferences(request.getPreferences())
                .build();
    }

    public UserResponse toResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .authUserId(user.getAuthUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .employeeId(user.getEmployeeId())
                .department(user.getDepartment())
                .designation(user.getDesignation())
                .phoneNumber(user.getPhoneNumber())
                .profileImage(user.getProfileImage())
                .address(user.getAddress())
                .bio(user.getBio())
                .preferences(user.getPreferences())
                .profileStatus(user.getProfileStatus())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public void updateEntity(User user, UpdateUserRequest request) {

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmployeeId(request.getEmployeeId());
        user.setDepartment(request.getDepartment());
        user.setDesignation(request.getDesignation());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setProfileImage(request.getProfileImage());
        user.setAddress(request.getAddress());
        user.setBio(request.getBio());
        user.setPreferences(request.getPreferences());

        if (request.getProfileStatus() != null) {
            user.setProfileStatus(request.getProfileStatus());
        }
    }
}
