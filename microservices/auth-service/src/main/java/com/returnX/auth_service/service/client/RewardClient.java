package com.returnX.auth_service.service.client;

import com.returnX.auth_service.dto.RewardRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "reward-service")
public interface RewardClient {

    @PostMapping("/rewards/internal")
    void createReward(
            @RequestBody RewardRequest request
    );

}