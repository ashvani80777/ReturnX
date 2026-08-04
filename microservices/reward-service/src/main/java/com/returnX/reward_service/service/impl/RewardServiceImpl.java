package com.returnX.reward_service.service.impl;

import com.returnX.reward_service.dto.*;
import com.returnX.reward_service.entity.Reward;
import com.returnX.reward_service.repository.RewardRepository;
import com.returnX.reward_service.service.RewardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardServiceImpl implements RewardService {

    private final RewardRepository rewardRepository;

    @Override
    public RewardResponse createReward(RewardCreateRequest request) {

        if(request.getActionType().equals("FIRST_RETURN")
                && rewardRepository.existsByUserEmailAndActionType(
                request.getUserEmail(),
                "FIRST_RETURN")){

            throw new RuntimeException("First return reward already given");
        }

        boolean exists = rewardRepository
                .existsByUserEmailAndActionTypeAndReferenceId(
                        request.getUserEmail(),
                        request.getActionType(),
                        request.getReferenceId()
                );

        if (exists)
            throw new RuntimeException("Reward already given for this action");

        Reward reward = Reward.builder()
                .userEmail(request.getUserEmail())
                .points(request.getPoints())
                .actionType(request.getActionType())
                .reason(request.getReason())
                .referenceType(request.getReferenceType())
                .referenceId(request.getReferenceId())
                .build();

        return mapResponse(rewardRepository.save(reward));
    }


    @Override
    public RewardSummaryResponse getSummary(String email) {

        Integer points = rewardRepository.findTotalPointsByUserEmail(email);

        if(points == null)
            points = 0;

        return RewardSummaryResponse.builder()
                .totalPoints(points)
                .totalRewards(rewardRepository.countByUserEmail(email))
                .badge(calculateBadge(points))
                .build();
    }


    @Override
    public List<RewardResponse> getRewardHistory(String email) {

        return rewardRepository
                .findByUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::mapResponse)
                .toList();
    }


    @Override
    public List<LeaderboardResponse> getLeaderboard() {

        return rewardRepository.findLeaderboard()
                .stream()
                .map(row -> LeaderboardResponse.builder()
                        .userEmail((String)row[0])
                        .totalPoints(((Number)row[1]).intValue())
                        .build())
                .toList();
    }


    private RewardResponse mapResponse(Reward reward){

        return RewardResponse.builder()
                .id(reward.getId())
                .points(reward.getPoints())
                .actionType(reward.getActionType())
                .reason(reward.getReason())
                .referenceType(reward.getReferenceType())
                .referenceId(reward.getReferenceId())
                .createdAt(reward.getCreatedAt())
                .build();
    }


    private boolean isFirstReturn(String email){

        return !rewardRepository.existsByUserEmailAndActionType(
                email,
                "FIRST_RETURN"
        );
    }


    private String calculateBadge(Integer points){

        if(points >= 500)
            return "Trusted Helper";

        if(points >= 300)
            return "Helpful Member";

        if(points >= 100)
            return "Active Helper";

        return "New Helper";
    }

    @Override
    @Transactional
    public void deleteUserRewards(String email) {
        rewardRepository.deleteByUserEmail(email);
    }
}