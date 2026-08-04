package com.returnX.admin_service.dto;

import lombok.Data;

@Data
public class LeaderboardResponse {

    private String userEmail;

    private Integer totalPoints;
}