package com.example.sellerspring.repository;

import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Role;
import com.example.sellerspring.entity.User;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@NonNullApi
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserId(Long id);

    Optional<User> findUserByEmail(String email);

    Boolean existsUserByEmail(String email);

    @Query(value = "SELECT " +
            "    first_name as firstName, " +
            "    email as email, " +
            "    phone_number as phoneNumber " +
            "FROM user " +
            "INNER JOIN seller.product p on user.user_id = p.user_id " +
            "WHERE product_id = :productId",
            nativeQuery = true)
    List<Map<String, Object>> getUserByProductId(@Param("productId") Long productId);
}
