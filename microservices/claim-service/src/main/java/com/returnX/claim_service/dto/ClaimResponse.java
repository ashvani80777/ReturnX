package com.returnX.claim_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClaimResponse {

    private Long id;

    private Long itemId;

    private String ownerEmail;

    private String claimerEmail;

    private String chatRoomId;

    private LocalDateTime claimedAt;
    private String status;
}