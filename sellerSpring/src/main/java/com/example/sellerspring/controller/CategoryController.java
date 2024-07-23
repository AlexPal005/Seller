package com.example.sellerspring.controller;


import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.repository.CategoryRepository;
import com.example.sellerspring.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAll() {
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/getCategoriesByParentId/{parentId}")
    public ResponseEntity<List<Category>> getCategoriesByParentId(@PathVariable Long parentId) {
        return new ResponseEntity<>(categoryService.getCategoriesByParentId(parentId), HttpStatus.OK);
    }
}
