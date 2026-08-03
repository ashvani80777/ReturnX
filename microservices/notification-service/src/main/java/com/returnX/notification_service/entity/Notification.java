package com.returnX.notification_service.entity;

import com.returnX.notification_service.enums.NotificationStatus;
import com.returnX.notification_service.enums.NotificationType;
import com.returnX.notification_service.enums.ReferenceType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String title;

    @Column(length = 1000)
    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    private NotificationStatus status;

    private String referenceId;

    @Enumerated(EnumType.STRING)
    private ReferenceType referenceType;

    private LocalDateTime createdAt;

    private LocalDateTime readAt;
}