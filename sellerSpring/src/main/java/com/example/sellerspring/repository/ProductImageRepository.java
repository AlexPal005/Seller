package com.example.sellerspring.repository;


import com.example.sellerspring.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    @Query(value = "SELECT image " +
            "FROM product_image " +
            "WHERE product_id = :productId",
            nativeQuery = true)
    List<Map<String, Object>> getProductImagesByProductId(@Param("productId") Long productId);
}
