package com.returnX.chat_service.service;

import com.returnX.chat_service.dto.CreateNotificationRequest;
import com.returnX.chat_service.dto.MessageRequest;
import com.returnX.chat_service.dto.MessageResponse;
import com.returnX.chat_service.entity.Message;
import com.returnX.chat_service.entity.MessageStatus;
import com.returnX.chat_service.repository.MessageRepository;
import com.returnX.chat_service.service.client.NotificationClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final MessageRepository messageRepository;
    private final NotificationClient notificationClient;

    public MessageResponse saveMessage(MessageRequest request, String senderEmail) {

        Message message = Message.builder()
                .chatRoomId(request.getChatRoomId())
                .senderEmail(senderEmail)
                .receiverEmail(request.getReceiverEmail())
                .message(request.getMessage())
                .status(MessageStatus.SENT)
                .sentAt(LocalDateTime.now())
                .build();

        message = messageRepository.save(message);

        notificationClient.createNotification(
                CreateNotificationRequest.builder()
                        .userEmail(request.getReceiverEmail())
                        .title("New Message")
                        .message("You received a new chat message")
                        .type("CHAT_MESSAGE")
                        .referenceId(String.valueOf(message.getId()))
                        .referenceType("CHAT")
                        .build()
        );

        return mapToResponse(message);
    }

    public List<MessageResponse> getChatHistory(String chatRoomId) {
        return messageRepository.findByChatRoomIdOrderBySentAtAsc(chatRoomId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private MessageResponse mapToResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .chatRoomId(message.getChatRoomId())
                .senderEmail(message.getSenderEmail())
                .receiverEmail(message.getReceiverEmail())
                .message(message.getMessage())
                .status(message.getStatus())
                .sentAt(message.getSentAt())
                .build();
    }
}