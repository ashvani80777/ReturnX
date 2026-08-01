package com.returnX.auth_service.service.client;


import com.returnX.auth_service.dto.CreateUserRequest;
import org.springframework.stereotype.Component;

@Component
public class UserClientFallback implements UserClient {


    @Override
    public void createUser(CreateUserRequest request) {

        throw new RuntimeException(
                "User Service is currently unavailable"
        );
    }
}