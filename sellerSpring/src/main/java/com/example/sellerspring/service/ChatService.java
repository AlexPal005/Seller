package com.example.sellerspring.service;

import com.example.sellerspring.dto.ChatDTO;
import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.entity.User;
import com.example.sellerspring.repository.ChatRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final ProductService productService;

    public List<Chat> getChatsByUserId(Long userId) {
        User user = userService.getUserById(userId);
        return chatRepository.findChatsByUser1OrUser2(user, user);
    }

    public Chat getChatByChatId(Long chatId) {
        Optional<Chat> chatOptional = chatRepository.findChatById(chatId);
        Chat chat;
        if (chatOptional.isPresent()) {
            chat = chatOptional.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return chat;
    }

    public Chat create(ChatDTO dto) {
        User user1 = userService.getUserById(dto.getUser1Id());
        User user2 = userService.getUserById(dto.getUser2Id());
        Product product = productService.getProductById(dto.getProductId());
        Chat chat = Chat.builder()
                .user1(user1)
                .user2(user2)
                .product(product)
                .build();
    }
}
