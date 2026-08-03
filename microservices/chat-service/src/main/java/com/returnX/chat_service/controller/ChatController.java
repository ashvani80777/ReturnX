package com.returnX.chat_service.controller;

import com.returnX.chat_service.dto.MessageRequest;
import com.returnX.chat_service.dto.MessageResponse;
import com.returnX.chat_service.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(MessageRequest request) {

        MessageResponse response = chatService.saveMessage(
                request,
                request.getSenderEmail()
        );

        messagingTemplate.convertAndSend(
                "/topic/chat/" + request.getChatRoomId(),
                response
        );
    }

    @RestController
    @RequestMapping("/chat")
    @RequiredArgsConstructor
    static class ChatHistoryController {

        private final ChatService chatService;

        @GetMapping("/{chatRoomId}")
        public List<MessageResponse> getHistory(
                @PathVariable String chatRoomId
        ) {
            return chatService.getChatHistory(chatRoomId);
        }
    }
}