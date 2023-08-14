package com.demo.controller;

import com.demo.dto.request.ChatMessage;
import com.demo.model.Chat;
import com.demo.model.Room;
import com.demo.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final IRoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    @Transactional
    public ChatMessage receivePrivateMessage (@Payload ChatMessage chatMessage) {
        Room room = roomService.saveChat(chatMessage);

        simpMessagingTemplate.convertAndSendToUser(chatMessage.getSenderEmail(), "/private", room);
        simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiverEmail(), "/private", room);

        return chatMessage;
    }
}
