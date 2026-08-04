package com.returnX.admin_service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardResponse {


    private long totalUsers;

    private long totalLostItems;

    private long totalFoundItems;

    private long totalReturnedItems;


    private List<UserResponse> users;


    private List<ItemResponse> items;


    private List<LeaderboardResponse> leaderboard;

}