package com.returnX.reward_service.service;



import com.returnX.reward_service.dto.LeaderboardResponse;
import com.returnX.reward_service.dto.RewardCreateRequest;
import com.returnX.reward_service.dto.RewardResponse;
import com.returnX.reward_service.dto.RewardSummaryResponse;

import java.util.List;

public interface RewardService {

    RewardResponse createReward(RewardCreateRequest request);

    RewardSummaryResponse getSummary(String email);

    List<RewardResponse> getRewardHistory(String email);

    List<LeaderboardResponse> getLeaderboard();

    void deleteUserRewards(String email);

}