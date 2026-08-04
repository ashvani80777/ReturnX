package com.returnX.admin_service.client;


import com.returnX.admin_service.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name="AUTH-SERVICE",configuration = FeignConfig.class)
public interface AuthServiceClient {


    @DeleteMapping("/auth/users/{id}")
    void deleteAuthUser(
            @PathVariable Long id
    );

}