package com.example.sellerspring.controller;


import com.example.sellerspring.dto.ChatDTO;
import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping("/create")
    public ResponseEntity<Chat> create (@RequestBody ChatDTO dto) {
        try {
            return new ResponseEntity<>(chatService.create(dto),
                    HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
