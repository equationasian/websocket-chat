package com.example.Chat;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatUser {
    private String username;
    private String password;

    public ChatUser() {}

    public ChatUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
