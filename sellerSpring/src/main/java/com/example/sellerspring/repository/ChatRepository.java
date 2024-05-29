package com.example.sellerspring.repository;

import com.example.sellerspring.entity.Chat;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findChatsByUser1OrUser2(User user1, User user2);

    Optional<Chat> findChatById(Long id);

    Boolean existsChatByUser1AndUser2AndProduct(User user1, User user2, Product product);
    Chat findChatByUser1AndUser2AndProduct(User user1, User user2, Product product);
}
