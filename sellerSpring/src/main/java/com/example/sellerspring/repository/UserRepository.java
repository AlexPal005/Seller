package com.example.sellerspring.repository;

import com.example.sellerspring.entity.Category;
import com.example.sellerspring.entity.Role;
import com.example.sellerspring.entity.User;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@NonNullApi
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);

    Optional<User> findUserByEmail(String email);

    Boolean existsUserByEmail(String email);
}
