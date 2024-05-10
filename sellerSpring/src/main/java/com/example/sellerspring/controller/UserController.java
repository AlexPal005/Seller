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

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<User> create(@RequestBody UserDTO dto) {
        try {
            return new ResponseEntity<>(userService.create(dto), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getByEmail(email), HttpStatus.OK);
    }
}
