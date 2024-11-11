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
    @Query(value = "WITH RECURSIVE category_hierarchy AS (" +
            "    SELECT category_id, parent_id, category_name" +
            "    FROM category" +
            "    WHERE category_name = :categoryName" +
            "    UNION ALL" +
            "    SELECT c.category_id, c.parent_id, c.category_name" +
            "    FROM category c" +
            "             INNER JOIN category_hierarchy ch ON c.parent_id = ch.category_id" +
            ")" +
            "SELECT DISTINCT product.product_name as productName, " +
            "       product.price as price, " +
            "       c.city_name as cityName, " +
            "       r.region_name as regionName, " +
            "       product.created_at as createdAt, " +
            "       product.product_id as productId, " +
            "       (SELECT pi.image " +
            "        FROM product_image pi " +
            "        WHERE pi.product_id = product.product_id " +
            "        LIMIT 1) as mainImage " +
            "FROM product " +
            "         INNER JOIN city c on product.city_id = c.city_id " +
            "         INNER JOIN region r on c.region_id = r.region_id " +
            "         LEFT JOIN product_image pi on product.product_id = pi.product_id " +
            "         INNER JOIN category on product.category_id = category.category_id " +
            "WHERE (:productName IS NULL OR product.product_name LIKE CONCAT(:productName, '%')) " +
            "  AND (:cityName IS NULL OR c.city_name = :cityName) " +
            "  AND (:regionName IS NULL OR r.region_name = :regionName) " +
            "  AND (:categoryName IS NULL OR category.category_id IN (SELECT category_id FROM category_hierarchy)) " +
            "  AND (:priceFrom IS NULL OR product.price >= :priceFrom) " +
            "  AND (:priceTo IS NULL OR product.price <= :priceTo)",
            nativeQuery = true)
    List<Map<String, Object>> getProductsByCriteria(@Param("productName") String productName,
                                                    @Param("cityName") String cityName,
                                                    @Param("regionName") String regionName,
                                                    @Param("categoryName") String categoryName,
                                                    @Param("priceFrom") Double priceFrom,
                                                    @Param("priceTo") Double priceTo);

    @Query(value = "WITH RECURSIVE category_hierarchy AS (" +
            "    SELECT category_id, parent_id, category_name" +
            "    FROM category" +
            "    WHERE category_name = :categoryName" +
            "    UNION ALL" +
            "    SELECT c.category_id, c.parent_id, c.category_name" +
            "    FROM category c" +
            "             INNER JOIN category_hierarchy ch ON c.parent_id = ch.category_id" +
            ")" +
            "SELECT COUNT(DISTINCT product.product_id) " +
            "FROM product " +
            "INNER JOIN city c on product.city_id = c.city_id " +
            "INNER JOIN region r on c.region_id = r.region_id " +
            "LEFT JOIN product_image pi on product.product_id = pi.product_id " +
            "INNER JOIN category on product.category_id = category.category_id " +
            "WHERE (:productName IS NULL OR product.product_name LIKE CONCAT(:productName, '%')) " +
            "AND (:cityName IS NULL OR c.city_name = :cityName) " +
            "AND (:regionName IS NULL OR r.region_name = :regionName) " +
            "AND (:categoryName IS NULL OR category.category_id IN (SELECT category_id FROM category_hierarchy)) " +
            "AND (:priceFrom IS NULL OR product.price >= :priceFrom) " +
            "AND (:priceTo IS NULL OR product.price <= :priceTo)",
            nativeQuery = true)
    Long countProductsByCriteria(@Param("productName") String productName,
                                 @Param("cityName") String cityName,
                                 @Param("regionName") String regionName,
                                 @Param("categoryName") String categoryName,
                                 @Param("priceFrom") Double priceFrom,
                                 @Param("priceTo") Double priceTo);

    @Query(value = "SELECT DISTINCT product.product_name as productName, " +
            "                product.price        as price, " +
            "                c.city_name          as cityName, " +
            "                r.region_name        as regionName, " +
            "                product.created_at   as createdAt, " +
            "                product.product_id   as productId, " +
            "                cat.category_name    as categoryName, " +
            "                (SELECT pi.image " +
            "                 FROM product_image pi " +
            "                 WHERE pi.product_id = product.product_id " +
            "                 LIMIT 1)            as mainImage " +
            "FROM product " +
            "         INNER JOIN city c on product.city_id = c.city_id " +
            "         INNER JOIN region r on c.region_id = r.region_id " +
            "         INNER JOIN category cat on product.category_id = cat.category_id " +
            "WHERE product.user_id = :userId",
            nativeQuery = true)
    List<Map<String, Object>> getProductsByUserId(@Param("userId") Long userID);


    @Query(value = "SELECT product.product_name as productName, " +
            "       product.price        as price, " +
            "       c.city_name          as cityName, " +
            "       r.region_name        as regionName, " +
            "       product.created_at   as createdAt, " +
            "       product.product_id   as productId, " +
            "       cat.category_name    as categoryName, " +
            "       product.description  as description " +
            "FROM product " +
            "INNER JOIN city c on product.city_id = c.city_id " +
            "INNER JOIN region r on c.region_id = r.region_id " +
            "INNER JOIN category cat on product.category_id = cat.category_id " +
            "WHERE product_id = :productId",
            nativeQuery = true)
    List<Map<String, Object>> getProductJsonById(@Param("productId") Long productId);

    Product findProductById(Long productId);

}
