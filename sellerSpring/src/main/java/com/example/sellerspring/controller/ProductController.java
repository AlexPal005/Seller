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

    @GetMapping("/searchProductsByCriteria")
    public ResponseEntity<List<Map<String, Object>>> searchProductsByCriteria(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String regionName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double priceFrom,
            @RequestParam(required = false) Double priceTo,
            @RequestParam() int pageNumber,
            @RequestParam() int countProductsOnPage
    ) {
        return new ResponseEntity<>(productService.getProductsByCriteria(
                productName,
                cityName,
                regionName,
                category,
                priceFrom,
                priceTo,
                pageNumber,
                countProductsOnPage), HttpStatus.OK);
    }

    @GetMapping("/countProducts")
    public ResponseEntity<Long> countProducts(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String regionName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double priceFrom,
            @RequestParam(required = false) Double priceTo
    ) {
        return new ResponseEntity<>(productService.countProducts(
                productName,
                cityName,
                regionName,
                category,
                priceFrom,
                priceTo), HttpStatus.OK);
    }

    @GetMapping("/getProductsByUserId")
    public ResponseEntity<List<Map<String, Object>>> getProductsByUserId(
            @RequestParam Long userId,
            @RequestParam String status,
            @RequestParam(required = false)  String productName,
            @RequestParam(required = false)  String categoryName,
            @RequestParam(required = false)  String sortBy,
            @RequestParam(required = false)  String sortDirection
    ) {
        return new ResponseEntity<>(productService.getProductsByUserId(
                userId,
                status,
                productName,
                categoryName,
                sortBy,
                sortDirection), HttpStatus.OK);
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
