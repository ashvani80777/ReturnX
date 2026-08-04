package com.returnX.claim_service.repository;

import com.returnX.claim_service.entity.Claim;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    boolean existsByItemIdAndClaimerEmail(Long itemId, String claimerEmail);

    List<Claim> findByClaimerEmailOrderByClaimedAtDesc(String claimerEmail);

    Optional<Claim> findByChatRoomId(String chatRoomId);

    List<Claim> findByOwnerEmailOrderByClaimedAtDesc(String ownerEmail);

    @Transactional
    void deleteByClaimerEmailIgnoreCaseOrOwnerEmailIgnoreCase(String claimerEmail, String ownerEmail);

}