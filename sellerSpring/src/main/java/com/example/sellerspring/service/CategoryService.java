package com.example.sellerspring.service;

import com.example.sellerspring.entity.Category;
import com.example.sellerspring.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoriesByParentId(Long parentId) {
        return categoryRepository.findCategoriesByParentId(parentId);
    }
}
