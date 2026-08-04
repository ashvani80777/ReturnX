package com.returnX.admin_service.client;

import com.returnX.admin_service.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "CHAT-SERVICE",
        configuration = FeignConfig.class
)
public interface ChatServiceClient {

    @DeleteMapping("/chat/admin/user")
    void deleteUserMessages(@RequestParam("email") String email);
}