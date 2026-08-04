package com.returnX.admin_service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;

    @Value("${jwt.expiration}")
    private Long expiration;

    public JwtService(
            @Value("${jwt.secret}") String secret
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }


    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + expiration)
                )
                .signWith(key)
                .compact();
    }


    public String extractEmail(String token) {

        return getClaims(token)
                .getSubject();
    }


    public String extractRole(String token) {

        return getClaims(token)
                .get("role", String.class);
    }


    public boolean validateToken(String token) {

        try {
            getClaims(token);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }


    private Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}