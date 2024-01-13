package com.example.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class SignupController {
    @Autowired
    private ChatUserDAO chatUserDAO;

    @GetMapping("/signup.html")
    public String signupPage() {
        return "static/signup.html";
    }

    @PostMapping("/signup.html")
    public String signupForm(@RequestBody ChatUser user) {
        boolean isCreated = chatUserDAO.createUser(user);
        if (!isCreated) {
            return "redirect:/signup.html?error";
        }

        return "redirect:/login.html?registered";
    }
}
