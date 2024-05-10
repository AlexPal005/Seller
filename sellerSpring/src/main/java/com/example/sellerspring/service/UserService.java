package com.example.sellerspring.service;

import com.example.sellerspring.dto.UserDTO;
import com.example.sellerspring.entity.Product;
import com.example.sellerspring.entity.User;
import com.example.sellerspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User create(UserDTO dto) {
        User user = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .password(dto.getPassword())
                .build();

        return userRepository.save(user);
    }

    public User getByEmail(String email) {
        Optional<User> userOptional = userRepository.getUserByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return user;
    }

}
