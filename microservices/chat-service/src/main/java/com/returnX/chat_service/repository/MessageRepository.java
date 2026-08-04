package com.returnX.chat_service.repository;


import com.returnX.chat_service.entity.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MessageRepository extends JpaRepository<Message, Long> {


    List<Message> findByChatRoomIdOrderBySentAtAsc(String chatRoomId);

    @Transactional
    void deleteBySenderEmailIgnoreCaseOrReceiverEmailIgnoreCase(String senderEmail, String receiverEmail);


}