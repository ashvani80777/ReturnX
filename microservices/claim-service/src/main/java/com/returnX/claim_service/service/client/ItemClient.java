package com.returnX.claim_service.service.client;

import com.returnX.claim_service.config.FeignConfig;
import com.returnX.claim_service.dto.ItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(
        name = "item-service",
        configuration = FeignConfig.class
)
public interface ItemClient {

    @GetMapping("/items/{itemId}")
    ItemResponse getItemById(
            @PathVariable Long itemId
    );
}