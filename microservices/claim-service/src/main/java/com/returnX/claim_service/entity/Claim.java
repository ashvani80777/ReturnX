package com.returnX.claim_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "claims",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"item_id", "claimant_email"}
                )
        }
)
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "item_id",
            nullable = false
    )
    private Long itemId;

    @Column(
            name = "owner_email",
            nullable = false,
            length = 120
    )
    private String ownerEmail;

    @Column(
            name = "claimant_email",
            nullable = false,
            length = 120
    )
    private String claimerEmail;

    @Column(
            name = "chat_room_id",
            nullable = false,
            unique = true,
            length = 100
    )
    private String chatRoomId;

    @Column(
            name = "status",
            nullable = false,
            length = 30
    )
    private String status = "PROCESSING";

    @Column(
            name = "claimed_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime claimedAt;

    @PrePersist
    void prePersist() {
        claimedAt = LocalDateTime.now();
        if (status == null) {
            status = "PROCESSING";
        }
    }
}