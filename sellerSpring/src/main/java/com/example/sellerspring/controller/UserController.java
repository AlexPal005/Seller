package com.example.sellerspring.controller;


import com.example.sellerspring.dto.UserDTO;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.entity.User;
import com.example.sellerspring.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/getUserByProductId/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getUserByProductId(@PathVariable Long productId) {
        return new ResponseEntity<>(userService.getUseByProductId(productId), HttpStatus.OK);
    }
}
