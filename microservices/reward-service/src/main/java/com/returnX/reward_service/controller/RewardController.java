package com.returnX.reward_service.controller;

import com.returnX.reward_service.dto.LeaderboardResponse;
import com.returnX.reward_service.dto.RewardCreateRequest;
import com.returnX.reward_service.dto.RewardResponse;
import com.returnX.reward_service.dto.RewardSummaryResponse;
import com.returnX.reward_service.service.RewardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/rewards")
@RequiredArgsConstructor
public class RewardController {


    private final RewardService rewardService;


    @PostMapping("/internal")
    public RewardResponse createReward(
            @Valid @RequestBody RewardCreateRequest request
    ) {

        return rewardService.createReward(request);
    }


    @GetMapping("/me/summary")
    public RewardSummaryResponse getMySummary(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return rewardService.getSummary(email);
    }
    @GetMapping("/me/history")
    public List<RewardResponse> getMyHistory(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return rewardService.getRewardHistory(email);
    }


    @GetMapping("/leaderboard")
    public List<LeaderboardResponse> getLeaderboard() {

        return rewardService.getLeaderboard();
    }

    @DeleteMapping("/internal/user")
    public ResponseEntity<String> deleteUserRewards(@RequestParam("email") String email) {
        rewardService.deleteUserRewards(email);
        return ResponseEntity.ok("User rewards deleted successfully.");
    }

}