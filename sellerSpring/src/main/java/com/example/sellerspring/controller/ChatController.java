package com.example.sellerspring.controller;


import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;


    @GetMapping("/getChatsByUserId/{userId}")
    public ResponseEntity<List<Chat>> get(@PathVariable Long userId) {
        return new ResponseEntity<>(chatService.getChatsByUserId(userId), HttpStatus.OK);
    }
}
