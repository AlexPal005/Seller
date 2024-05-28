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
    @Query(value = "SELECT p.product_name as productName, " +
            "c.category_name as categoryName " +
            "FROM product p " +
            "INNER JOIN category c ON p.category_id = c.category_id " +
            "WHERE p.product_name like CONCAT(:string, '%')",
            nativeQuery = true)
    List<Map<String, Object>> findProductByNameStartingWith(
            @Param("string") String string);

    @Query(value = "SELECT DISTINCT product.product_name as productName, " +
            "       product.price        as price, " +
            "       c.city_name          as cityName, " +
            "       r.region_name        as regionName, " +
            "       product.created_at   as createdAt, " +
            "       product.product_id   as productId,  " +
            "(SELECT pi.image " +
            "                 FROM product_image pi " +
            "                 WHERE pi.product_id = product.product_id " +
            "                 LIMIT 1)            as mainImage " +
            "FROM product " +
            "         INNER JOIN city c on product.city_id = c.city_id " +
            "         INNER JOIN region r on c.region_id = r.region_id " +
            "         INNER JOIN product_image pi on product.product_id = pi.product_id " +
            "WHERE product.product_name like CONCAT(:productName, '%') " +
            "  AND c.city_name = :cityName " +
            "  AND r.region_name = :regionName ",
            nativeQuery = true)
    List<Map<String, Object>> getProductsStartsWithAndCityName(@Param("productName") String productName,
                                                               @Param("cityName") String cityName,
                                                               @Param("regionName") String regionName);

    @Query(value = "SELECT DISTINCT product.product_name as productName, " +
            "                product.price        as price, " +
            "                c.city_name          as cityName, " +
            "                r.region_name        as regionName, " +
            "                product.created_at   as createdAt, " +
            "                product.product_id   as productId, " +
            "                (SELECT pi.image " +
            "                 FROM product_image pi " +
            "                 WHERE pi.product_id = product.product_id " +
            "                 LIMIT 1)            as mainImage " +
            "FROM product " +
            "         INNER JOIN city c on product.city_id = c.city_id " +
            "         INNER JOIN region r on c.region_id = r.region_id",
            nativeQuery = true)
    List<Map<String, Object>> getAllProducts();


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
