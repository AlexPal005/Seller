package com.example.sellerspring.service;

import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.repository.CategoryRepository;
import com.example.sellerspring.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
