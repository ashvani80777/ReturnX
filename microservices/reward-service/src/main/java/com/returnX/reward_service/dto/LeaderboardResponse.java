package com.returnX.reward_service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderboardResponse {

    private String userEmail;
    private Integer totalPoints;

}