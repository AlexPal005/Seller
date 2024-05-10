package com.example.sellerspring.controller;

import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Product> create(@RequestBody ProductDTO dto) {
        try {
            return new ResponseEntity<>(productService.create(dto), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/readAll")
    public ResponseEntity<List<Product>> readAll() {
        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }
}
