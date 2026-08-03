package com.returnX.notification_service.service;

import com.returnX.notification_service.dto.CreateNotificationRequest;
import com.returnX.notification_service.dto.NotificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    NotificationResponse createNotification(CreateNotificationRequest request);

    Page<NotificationResponse> getUserNotifications(String userEmail, Pageable pageable);

    long getUnreadCount(String userEmail);

    NotificationResponse markAsRead(Long id, String userEmail);

    void markAllAsRead(String userEmail);
}