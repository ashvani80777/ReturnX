package com.returnX.chat_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageRequest {
    @NotBlank
    private String chatRoomId;
    @NotBlank
    private String senderEmail;

    private String receiverEmail;
    @NotBlank
    private String message;
}