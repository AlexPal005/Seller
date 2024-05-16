package com.example.sellerspring.repository;

import com.example.sellerspring.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.product_name, c.category_name " +
            "FROM product p " +
            "INNER JOIN category c ON p.category_id = c.category_id " +
            "WHERE p.product_name like CONCAT(:string, '%')",
            nativeQuery = true)
    List<Map<String, Object>> findProductByNameStartingWith(@Param("string") String string);
}
