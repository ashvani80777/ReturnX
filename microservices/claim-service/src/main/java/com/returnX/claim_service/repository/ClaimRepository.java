package com.returnX.claim_service.repository;

import com.returnX.claim_service.entity.Claim;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    boolean existsByItemIdAndClaimerEmail(Long itemId, String claimerEmail);

    List<Claim> findByClaimerEmailOrderByClaimedAtDesc(String claimerEmail);

    Optional<Claim> findByChatRoomId(String chatRoomId);

    List<Claim> findByOwnerEmailOrderByClaimedAtDesc(String ownerEmail);

    @Transactional
    void deleteByClaimerEmailIgnoreCaseOrOwnerEmailIgnoreCase(String claimerEmail, String ownerEmail);

    @Modifying
    @Transactional
    @Query("UPDATE Claim c SET c.status = :status WHERE c.itemId = :itemId")
    void updateStatusByItemId(@Param("itemId") Long itemId, @Param("status") String status);

}