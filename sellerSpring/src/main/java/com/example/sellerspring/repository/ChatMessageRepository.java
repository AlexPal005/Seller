package com.example.sellerspring.repository;

import com.example.sellerspring.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query(value = "SELECT created_at as createdAt, " +
            "       text       as text, " +
            "       user_id    as userId, " +
            "       message_id as messageId " +
            "FROM chat_message " +
            "WHERE chat_id = :chatId",
            nativeQuery = true)
    List<Map<String, Object>> getChatMessagesByChatId(@Param("chatId") Long chatId);
}
