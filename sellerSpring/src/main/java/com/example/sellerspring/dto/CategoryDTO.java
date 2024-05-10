package com.example.sellerspring.dto;

import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Product;

import java.util.List;

public class CategoryDTO {
    private String name;
    private Category perentCategory;
    private List<Product> products;
}
