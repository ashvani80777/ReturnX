package com.returnX.admin_service.client;


import com.returnX.admin_service.config.FeignConfig;
import com.returnX.admin_service.dto.UserPageResponse;
import com.returnX.admin_service.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;



@FeignClient(
        name = "USER-SERVICE",
        configuration = FeignConfig.class
)
public interface UserServiceClient {



    @GetMapping("/users")
    UserPageResponse getAllUsers();



    @GetMapping("/users/{id}")
    UserResponse getUserById(
            @PathVariable Long id
    );



    @DeleteMapping("/users/{id}")
    void deleteUser(
            @PathVariable Long id
    );

}