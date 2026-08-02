package com.returnX.chat_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Table(name = "messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "chat_room_id", nullable = false)
    private String chatRoomId;


    @Column(name = "sender_email", nullable = false)
    private String senderEmail;


    @Column(name = "receiver_email")
    private String receiverEmail;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;




    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MessageStatus status;


    @Column(name = "sent_at", nullable = false)
    private LocalDateTime sentAt;

}