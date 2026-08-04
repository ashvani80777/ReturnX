package com.returnX.reward_service.entity;

import com.returnX.reward_service.enums.ReferenceType;
import com.returnX.reward_service.enums.RewardAction;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rewards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String userEmail;


    @Column(nullable = false)
    private Integer points;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RewardAction actionType;


    @Column(nullable = false)
    private String reason;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReferenceType referenceType;


    @Column(nullable = false)
    private Long referenceId;


    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

}