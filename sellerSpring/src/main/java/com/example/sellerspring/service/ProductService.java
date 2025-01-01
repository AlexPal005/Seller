package com.example.sellerspring.service;

import com.example.sellerspring.ENUMS.ProductStatus;
import com.example.sellerspring.ENUMS.SortDirection;
import com.example.sellerspring.ENUMS.SortField;
import com.example.sellerspring.dto.ProductDTO;
import com.example.sellerspring.entity.*;
import com.example.sellerspring.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ProductImageRepository productImageRepository;
    private final CityRepository cityRepository;
    private final RegionRepository regionRepository;
    private final RegionService regionService;

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

        Optional<City> citiesOptional = cityRepository
                .getCityByCityNameAndRegionName(dto.getCityName(), dto.getRegionName());

        City city;
        if (citiesOptional.isPresent()) {
            city = citiesOptional.get();
        } else {
            Region region;
            if (regionRepository.existsRegionByRegionName(dto.getRegionName())) {
                region = regionService.getRegionByName(dto.getRegionName());
            } else {
                Region newRegion = Region.builder()
                        .regionName(dto.getRegionName())
                        .build();
                region = regionRepository.save(newRegion);
            }


            City newCity = City.builder()
                    .cityName(dto.getCityName())
                    .region(region)
                    .build();
            city = cityRepository.save(newCity);
        }

        Product newProduct = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .createdAt(dto.getCreatedAt())
                .category(category)
                .user(user)
                .city(city)
                .productStatus(ProductStatus.PENDING)
                .build();

        newProduct = productRepository.save(newProduct);

        if (!dto.getImages().isEmpty()) {

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

        }
        return newProduct;

    }


    public List<Map<String, Object>> getProductsByCriteria(String productName,
                                                           String cityName,
                                                           String regionName,
                                                           String category,
                                                           Double priceFrom,
                                                           Double priceTo,
                                                           int pageNumber,
                                                           int countProductsOnPage) {

        List<Map<String, Object>> allProducts = productRepository.getProductsByCriteria(
                productName,
                cityName,
                regionName,
                category,
                priceFrom,
                priceTo
        );

        int fromIndex = (pageNumber - 1) * countProductsOnPage;
        int toIndex = Math.min(fromIndex + countProductsOnPage, allProducts.size());
        if (fromIndex >= allProducts.size()) {
            return new ArrayList<>();
        }
        return allProducts.subList(fromIndex, toIndex);
    }

    public Long countProducts(String productName,
                              String cityName,
                              String regionName,
                              String category,
                              Double priceFrom,
                              Double priceTo) {
        return productRepository.countProductsByCriteria(
                productName,
                cityName,
                regionName,
                category,
                priceFrom,
                priceTo
        );
    }


    public List<Map<String, Object>> getProductsByUserId(Long userId,
                                                         String status,
                                                         String productName,
                                                         String categoryName,
                                                         String sortBy,
                                                         String sortDirection) {

        SortField field = sortBy != null ? SortField.fromString(sortBy) : null;
        SortDirection direction = sortDirection != null ? SortDirection.fromString(sortDirection) : null;
        return productRepository.getProductsByUserId(userId,
                status,
                productName,
                categoryName,
                field != null ? field.getField() : null,
                direction != null ? direction.getDirection() : null
        );
    }

    public List<Map<String, Object>> getProductJsonById(Long productId) {
        return productRepository.getProductJsonById(productId);
    }

    public Product getProductById(Long productId) {
        return productRepository.findProductById(productId);
    }
}
