package com.example.sellerspring.service;


import com.example.sellerspring.repository.ProductImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ProductImageService {
    private final ProductImageRepository productImageRepository;

    public List<Map<String, Object>> getImagesByProductId(Long productId) {
        return productImageRepository.getProductImagesByProductId(productId);
    }
}
