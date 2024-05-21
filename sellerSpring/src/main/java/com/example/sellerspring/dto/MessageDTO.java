package com.example.sellerspring.dto;

import lombok.Data;

import java.util.Date;

@Data

public class MessageDTO {
    private String text;
    private Long chatId;
    private Long userId;
}
