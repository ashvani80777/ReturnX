package com.returnX.chat_service.service.client;

import com.returnX.chat_service.dto.CreateNotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationClient {

    @PostMapping("/notifications")
    void createNotification(
            @RequestBody CreateNotificationRequest request
    );
}