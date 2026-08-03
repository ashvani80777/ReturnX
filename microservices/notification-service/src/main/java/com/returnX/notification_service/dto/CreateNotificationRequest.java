package com.returnX.notification_service.dto;

import com.returnX.notification_service.enums.NotificationType;
import com.returnX.notification_service.enums.ReferenceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateNotificationRequest {

    @NotBlank
    private String userEmail;

    @NotBlank
    private String title;

    @NotBlank
    private String message;

    @NotNull
    private NotificationType type;

    private String referenceId;

    private ReferenceType referenceType;
}