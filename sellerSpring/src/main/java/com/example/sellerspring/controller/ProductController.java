package com.example.sellerspring.controller;

import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.service.ProductImageService;
import com.example.sellerspring.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;
    private final ProductImageService productImageService;

    @PostMapping("/create")
    public ResponseEntity<Product> create(@RequestBody ProductDTO dto) {
        try {
            return new ResponseEntity<>(productService.create(dto),
                    HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Map<String, Object>>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/searchProductsByCriteria")
    public ResponseEntity<List<Map<String, Object>>> searchProductsByCriteria(
            @RequestParam String productName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String regionName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double priceFrom,
            @RequestParam(required = false) Double priceTo) {

        return new ResponseEntity<>(productService.getProductsByCriteria(
                productName,
                cityName,
                regionName,
                category
                /*priceFrom,
                priceTo*/), HttpStatus.OK);
    }

    @GetMapping("/getProductsByUserId/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getProductsByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(productService.getProductsByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/getProductById/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getProductById(@PathVariable Long productId) {
        return new ResponseEntity<>(productService.getProductJsonById(productId), HttpStatus.OK);
    }

    @GetMapping("/getImagesByProductId/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getImagesByProductId(@PathVariable Long productId) {
        return new ResponseEntity<>(productImageService.getImagesByProductId(productId), HttpStatus.OK);
    }
}
