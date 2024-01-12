package com.example.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

@Component
public class ChatUserDAO {
    @Autowired
    private InMemoryUserDetailsManager detailsManager;

    @Autowired
    private PasswordEncoder encoder;

    public void createUser(ChatUser user) {
        UserDetails newUser = User.builder()
                .username(user.getUsername())
                .password(encoder.encode(user.getPassword()))
                .roles("USER")
                .build();
        detailsManager.createUser(newUser);
    }
}
