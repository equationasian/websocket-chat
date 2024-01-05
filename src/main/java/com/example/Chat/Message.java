package com.example.Chat;

import org.springframework.web.util.HtmlUtils;

public class Message {
    private String content;

    public Message() {}

    public Message(String content) {
        this.content = HtmlUtils.htmlEscape(content);
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = HtmlUtils.htmlEscape(content);
    }
}
