package com.returnX.claim_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateClaimResponse {

    private Long claimId;

    private String chatRoomId;

    private String message;
}