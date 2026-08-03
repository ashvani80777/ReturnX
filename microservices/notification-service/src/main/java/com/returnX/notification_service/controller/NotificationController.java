package com.returnX.notification_service.controller;

import com.returnX.notification_service.dto.CreateNotificationRequest;
import com.returnX.notification_service.dto.NotificationResponse;
import com.returnX.notification_service.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public NotificationResponse create(@Valid @RequestBody CreateNotificationRequest request) {
        return notificationService.createNotification(request);
    }

    @GetMapping
    public Page<NotificationResponse> getNotifications(
            Authentication authentication,
            Pageable pageable) {

        return notificationService.getUserNotifications(
                authentication.getName(),
                pageable
        );
    }

    @GetMapping("/unread-count")
    public long unreadCount(Authentication authentication) {

        return notificationService.getUnreadCount(
                authentication.getName()
        );
    }

    @PatchMapping("/{id}/read")
    public NotificationResponse markAsRead(
            @PathVariable Long id,
            Authentication authentication) {

        return notificationService.markAsRead(
                id,
                authentication.getName()
        );
    }

    @PatchMapping("/read-all")
    public void markAllAsRead(Authentication authentication) {

        notificationService.markAllAsRead(
                authentication.getName()
        );
    }
}