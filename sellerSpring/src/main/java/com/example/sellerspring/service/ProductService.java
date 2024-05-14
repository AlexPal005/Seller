package com.example.sellerspring.service;

import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.entity.ProductImage;
import com.example.sellerspring.entity.User;
import com.example.sellerspring.repository.CategoryRepository;
import com.example.sellerspring.repository.ProductImageRepository;
import com.example.sellerspring.repository.ProductRepository;
import com.example.sellerspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ProductImageRepository productImageRepository;

    public Product create(ProductDTO dto) {
        Optional<Category> categoryOptional = categoryRepository.findById((long) dto.getCategoryId());
        Category category;
        Optional<User> userOptional = userRepository.findById((long) dto.getUserId());
        User user;
        if (categoryOptional.isPresent() && userOptional.isPresent()) {
            category = categoryOptional.get();
            user = userOptional.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }


        Product newProduct = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .createdAt(dto.getCreatedAt())
                .category(category)
                .user(user)
                .build();

        newProduct = productRepository.save(newProduct);


        List<ProductImage> productImages = new ArrayList<>();
        Product finalNewProduct = newProduct;

        dto.getImages().forEach(image -> {
            ProductImage productImage = ProductImage.builder()
                    .image(Base64.getMimeDecoder().decode(image))
                    .product(finalNewProduct)
                    .build();
            productImageRepository.save(productImage);
            productImages.add(productImage);
        });

        newProduct.setProductImages(productImages);

        return newProduct;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }
}
