package com.returnX.notification_service.dto;

import com.returnX.notification_service.enums.NotificationStatus;
import com.returnX.notification_service.enums.NotificationType;
import com.returnX.notification_service.enums.ReferenceType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;
    private String title;
    private String message;
    private NotificationType type;
    private NotificationStatus status;
    private String referenceId;
    private ReferenceType referenceType;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}