package com.returnX.reward_service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardSummaryResponse {


    private Integer totalPoints;

    private Long totalRewards;

    private String badge;

}