package com.example.sellerspring.controller;


import com.example.sellerspring.dto.MessageDTO;
import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.entity.ChatMessage;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.service.ChatMessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/message")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;


    @GetMapping("/getMessagesByChatId/{chatId}")
    public ResponseEntity<List<Map<String, Object>>> get(@PathVariable Long chatId) {
        return new ResponseEntity<>(chatMessageService.getChatMessagesByChatId(chatId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ChatMessage> create(@RequestBody MessageDTO dto) {
        try {
            return new ResponseEntity<>(chatMessageService.create(dto), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
