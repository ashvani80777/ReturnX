package com.returnX.admin_service.client;

import com.returnX.admin_service.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "CLAIM-SERVICE",
        configuration = FeignConfig.class
)
public interface ClaimServiceClient {

    @DeleteMapping("/claims/admin/user")
    void deleteAllUserClaims(@RequestParam("email") String email);
}