package com.example.sellerspring.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Data
public class ProductDTO {

    private String name;
    private String description;
    private double price;
    private Date createdAt;
    private byte[] image;
    private int categoryId;
    private int userId;
}
