package com.example.sellerspring.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDate;
import java.util.Date;

@Component
public class JWTGenerator {
    private static final SecretKey key = Jwts.SIG.HS256.key().build();

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();


        long now = System.currentTimeMillis();
        long expirationTime = now + 86400000; // 1 day in milliseconds

        return Jwts.builder()
                .subject(username)
                .signWith(key)
                .issuedAt(new Date(now))
                .expiration(new Date(expirationTime))
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect", ex.fillInStackTrace());
        }
    }

}
