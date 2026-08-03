package com.returnX.claim_service.service;

import com.returnX.claim_service.dto.ClaimResponse;
import com.returnX.claim_service.dto.CreateClaimResponse;

import java.util.List;

public interface ClaimService {

    CreateClaimResponse createClaim(Long itemId, String email);

    List<ClaimResponse> getMyClaims(String email);

    ClaimResponse getClaimById(Long claimId);

    ClaimResponse getByChatRoomId(String chatRoomId);
}