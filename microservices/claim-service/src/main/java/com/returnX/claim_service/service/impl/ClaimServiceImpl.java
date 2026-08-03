package com.returnX.claim_service.service.impl;

import com.returnX.claim_service.dto.*;
import com.returnX.claim_service.entity.Claim;
import com.returnX.claim_service.enums.NotificationType;
import com.returnX.claim_service.enums.ReferenceType;
import com.returnX.claim_service.exception.*;
import com.returnX.claim_service.repository.ClaimRepository;
import com.returnX.claim_service.service.ClaimService;
import com.returnX.claim_service.service.client.*;
import feign.FeignException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClaimServiceImpl implements ClaimService {

    private final ClaimRepository claimRepository;
    private final ItemClient itemClient;
    private final NotificationClient notificationClient;

    public ClaimServiceImpl(
            ClaimRepository claimRepository,
            ItemClient itemClient,
            NotificationClient notificationClient) {
        this.claimRepository = claimRepository;
        this.itemClient = itemClient;
        this.notificationClient = notificationClient;
    }

    @Override
    public CreateClaimResponse createClaim(Long itemId,String email){

        ItemResponse item;

        try{
            item=itemClient.getItemById(itemId);
        }catch(FeignException.NotFound e){
            throw new ItemServiceException("Item not found");
        }catch(FeignException e){
            throw new ItemServiceException("Unable to communicate with Item Service");
        }

        if(item.getOwnerEmail().equalsIgnoreCase(email))
            throw new UnauthorizedException("You cannot claim your own item");

        String claimerEmail=email.toLowerCase();

        if(claimRepository.existsByItemIdAndClaimerEmail(itemId,claimerEmail))
            throw new ClaimAlreadyExistsException("You have already claimed this item");

        Claim claim=new Claim();
        claim.setItemId(itemId);
        claim.setOwnerEmail(item.getOwnerEmail());
        claim.setClaimerEmail(claimerEmail);
        claim.setChatRoomId(UUID.randomUUID().toString());

        claim=claimRepository.save(claim);

        notificationClient.createNotification(
                CreateNotificationRequest.builder()
                        .userEmail(item.getOwnerEmail())
                        .title("Item Claimed")
                        .message("Someone claimed your lost item")
                        .type(NotificationType.ITEM_CLAIMED.toString())
                        .referenceId(String.valueOf(claim.getId()))
                        .referenceType(ReferenceType.CLAIM.toString())
                        .build()
        );

        return new CreateClaimResponse(
                claim.getId(),
                claim.getChatRoomId(),
                "Claim created successfully"
        );
    }

    @Override
    public List<ClaimResponse> getMyClaims(String email){
        return claimRepository
                .findByClaimerEmailOrderByClaimedAtDesc(email.toLowerCase())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ClaimResponse getClaimById(Long claimId){

        return mapToResponse(
                claimRepository.findById(claimId)
                        .orElseThrow(() -> new ClaimNotFoundException("Claim not found"))
        );
    }

    private ClaimResponse mapToResponse(Claim claim){
        return new ClaimResponse(
                claim.getId(),
                claim.getItemId(),
                claim.getOwnerEmail(),
                claim.getClaimerEmail(),
                claim.getChatRoomId(),
                claim.getClaimedAt()
        );
    }

    @Override
    public ClaimResponse getByChatRoomId(String chatRoomId){

        Claim claim = claimRepository.findByChatRoomId(chatRoomId)
                .orElseThrow(() ->
                        new ClaimNotFoundException("Claim not found"));

        return mapToResponse(claim);
    }
}