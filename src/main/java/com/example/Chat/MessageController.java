package com.example.Chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/chat")
    @SendTo("/topic/channel")
    public Message sendMessage(Message userMessage) {
        return userMessage;
    }
}
