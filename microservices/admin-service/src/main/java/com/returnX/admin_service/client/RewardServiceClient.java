package com.returnX.admin_service.client;

import com.returnX.admin_service.config.FeignConfig;
import com.returnX.admin_service.dto.LeaderboardResponse;
import com.returnX.admin_service.dto.RewardResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(
        name="REWARD-SERVICE",
        configuration = FeignConfig.class
)
public interface RewardServiceClient {

    @GetMapping("/rewards/leaderboard")
    List<LeaderboardResponse> getLeaderboard();


    @GetMapping("/rewards/me/history")
    List<RewardResponse> getUserRewardHistory(
            @RequestHeader("Authorization") String token
    );

    @DeleteMapping("/rewards/internal/user")
    void deleteUserRewards(@RequestParam("email") String email);

}