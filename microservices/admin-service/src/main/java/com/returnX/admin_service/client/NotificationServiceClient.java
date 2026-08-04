package com.returnX.admin_service.client;

import com.returnX.admin_service.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "NOTIFICATION-SERVICE",
        configuration = FeignConfig.class
)
public interface NotificationServiceClient {

    @DeleteMapping("/notifications/admin/user")
    void deleteUserNotifications(@RequestParam("email") String email);
}