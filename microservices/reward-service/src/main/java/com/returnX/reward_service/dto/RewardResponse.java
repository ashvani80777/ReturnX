package com.returnX.reward_service.dto;

import com.returnX.reward_service.enums.ReferenceType;
import com.returnX.reward_service.enums.RewardAction;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardResponse {


    private Long id;

    private Integer points;

    private RewardAction actionType;

    private String reason;

    private ReferenceType referenceType;

    private Long referenceId;

    private LocalDateTime createdAt;

}