package com.returnX.chat_service.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatClaimResponse {

    private Long id;

    private Long itemId;

    private String ownerEmail;

    private String claimerEmail;

    private String chatRoomId;

    private LocalDateTime claimedAt;
}