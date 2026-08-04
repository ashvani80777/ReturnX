package com.returnX.claim_service.controller;

import com.returnX.claim_service.dto.ClaimResponse;
import com.returnX.claim_service.dto.CreateClaimResponse;
import com.returnX.claim_service.service.ClaimService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping("/{itemId}")
    public ResponseEntity<CreateClaimResponse> createClaim(
            @PathVariable Long itemId,
            Authentication authentication) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(claimService.createClaim(itemId, authentication.getName()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ClaimResponse>> getMyClaims(
            Authentication authentication) {

        return ResponseEntity.ok(
                claimService.getMyClaims(authentication.getName())
        );
    }

    @GetMapping("/owner")
    public ResponseEntity<List<ClaimResponse>> getOwnerClaims(
            Authentication authentication) {

        return ResponseEntity.ok(
                claimService.getOwnerClaims(authentication.getName())
        );
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<ClaimResponse> getClaimById(
            @PathVariable Long claimId) {

        return ResponseEntity.ok(
                claimService.getClaimById(claimId)
        );
    }

    @GetMapping("/chat/{chatRoomId}")
    public ResponseEntity<ClaimResponse> getByChatRoomId(
            @PathVariable String chatRoomId) {

        return ResponseEntity.ok(
                claimService.getByChatRoomId(chatRoomId)
        );
    }

    @DeleteMapping("/admin/user")
    public ResponseEntity<String> deleteAllUserClaims(@RequestParam("email") String email) {
        claimService.deleteAllUserClaims(email);
        return ResponseEntity.ok("User claims deleted successfully.");
    }
}