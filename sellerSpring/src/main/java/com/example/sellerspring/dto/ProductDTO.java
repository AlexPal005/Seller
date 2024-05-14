package com.example.sellerspring.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Data
public class ProductDTO {

    private String name;
    private String description;
    private double price;
    private Date createdAt;
    private int categoryId;
    private int userId;

    private List<String> images;


}
