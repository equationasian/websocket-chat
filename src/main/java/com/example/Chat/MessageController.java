package com.example.Chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.Objects;

@Controller
public class MessageController {
    @MessageMapping("/channel")
    @SendTo("/topic/channel")
    public Message sendMessage(Message userMessage, @CurrentSecurityContext(expression = "authentication") Authentication auth) {
        userMessage.setUsername(auth.getName());
        return userMessage;
    }
}
