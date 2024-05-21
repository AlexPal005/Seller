package com.example.sellerspring.service;

import com.example.sellerspring.dto.MessageDTO;
import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.entity.ChatMessage;
import com.example.sellerspring.entity.User;
import com.example.sellerspring.repository.ChatMessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserService userService;
    private final ChatService chatService;

    public List<Map<String, Object>> getChatMessagesByChatId(Long chatId) {
        return chatMessageRepository.getChatMessagesByChatId(chatId);
    }

    public ChatMessage create(MessageDTO dto) {
        User user = userService.getUserById(dto.getUserId());
        Chat chat = chatService.getChatByChatId(dto.getChatId());
        ChatMessage newChatMessage = ChatMessage.builder()
                .text(dto.getText())
                .createdAt(new Date())
                .chat(chat)
                .user(user)
                .build();
        return chatMessageRepository.save(newChatMessage);
    }
}
