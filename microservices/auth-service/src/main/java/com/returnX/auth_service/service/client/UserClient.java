package com.returnX.auth_service.service.client;

import com.returnX.auth_service.dto.CreateUserRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {


    @PostMapping("/users")
    void createUser(
            @RequestBody CreateUserRequest request
    );

}