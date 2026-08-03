package com.returnX.chat_service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateNotificationRequest {

    private String userEmail;
    private String title;
    private String message;
    private String type;
    private String referenceId;
    private String referenceType;
}