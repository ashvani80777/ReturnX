package com.returnX.item_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "claim-service")
public interface ClaimClient {

    @PutMapping("/claims/item/{itemId}/status")
    void updateClaimStatusByItemId(
            @PathVariable("itemId") Long itemId,
            @RequestParam("status") String status
    );
}