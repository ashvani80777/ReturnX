package com.returnX.chat_service.dto;


import com.returnX.chat_service.entity.MessageStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class MessageResponse {


    private Long id;


    private String chatRoomId;


    private String senderEmail;


    private String receiverEmail;


    private String message;


    private MessageStatus status;


    private LocalDateTime sentAt;

}