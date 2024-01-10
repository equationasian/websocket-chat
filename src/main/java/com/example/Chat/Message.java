package com.example.Chat;

import org.springframework.web.util.HtmlUtils;

public class Message {
    private String username;
    private String content;

    public Message() {}

    public Message(String username, String content) {
        this.username = username;
        this.content = HtmlUtils.htmlEscape(content);
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = HtmlUtils.htmlEscape(content);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
