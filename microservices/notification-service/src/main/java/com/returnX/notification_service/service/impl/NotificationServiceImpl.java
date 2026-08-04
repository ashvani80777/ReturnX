package com.returnX.notification_service.service.impl;

import com.returnX.notification_service.dto.CreateNotificationRequest;
import com.returnX.notification_service.dto.NotificationResponse;
import com.returnX.notification_service.entity.Notification;
import com.returnX.notification_service.enums.NotificationStatus;
import com.returnX.notification_service.mapper.NotificationMapper;
import com.returnX.notification_service.repository.NotificationRepository;
import com.returnX.notification_service.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public NotificationResponse createNotification(CreateNotificationRequest request) {

        Notification notification = Notification.builder()
                .userEmail(request.getUserEmail())
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .status(NotificationStatus.UNREAD)
                .referenceId(request.getReferenceId())
                .referenceType(request.getReferenceType())
                .createdAt(LocalDateTime.now())
                .build();

        return NotificationMapper.toResponse(notificationRepository.save(notification));
    }

    @Override
    public Page<NotificationResponse> getUserNotifications(String userEmail, Pageable pageable) {

        return notificationRepository
                .findByUserEmailOrderByCreatedAtDesc(userEmail, pageable)
                .map(NotificationMapper::toResponse);
    }

    @Override
    public long getUnreadCount(String userEmail) {

        return notificationRepository
                .countByUserEmailAndStatus(userEmail, NotificationStatus.UNREAD);
    }

    @Override
    public NotificationResponse markAsRead(Long id, String userEmail) {

        Notification notification = notificationRepository
                .findByIdAndUserEmail(id, userEmail)
                .orElseThrow();

        notification.setStatus(NotificationStatus.READ);
        notification.setReadAt(LocalDateTime.now());

        return NotificationMapper.toResponse(notificationRepository.save(notification));
    }

    @Override
    public void markAllAsRead(String userEmail) {

        notificationRepository
                .findByUserEmailAndStatusOrderByCreatedAtDesc(userEmail, NotificationStatus.UNREAD)
                .forEach(notification -> {
                    notification.setStatus(NotificationStatus.READ);
                    notification.setReadAt(LocalDateTime.now());
                });
    }


    @Override
    @Transactional
    public void deleteUserNotifications(String userEmail) {
        notificationRepository.deleteByUserEmail(userEmail);
    }
}