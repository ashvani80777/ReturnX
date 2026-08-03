package com.returnX.chat_service.service.client;

import com.returnX.chat_service.dto.ChatClaimResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "claim-service")
public interface ClaimClient {

    @GetMapping("/claims/chat/{chatRoomId}")
    ChatClaimResponse getClaimByChatRoomId(
            @PathVariable("chatRoomId") String chatRoomId
    );
}