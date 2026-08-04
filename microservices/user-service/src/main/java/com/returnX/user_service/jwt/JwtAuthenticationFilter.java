package com.returnX.user_service.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Service
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    private final JwtService jwtService;


    public JwtAuthenticationFilter(
            JwtService jwtService
    ) {

        this.jwtService = jwtService;
    }



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )
            throws ServletException, IOException {


        String authHeader =
                request.getHeader("Authorization");


        if(authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request,response);
            return;
        }


        String token =
                authHeader.substring(7);



        if(!jwtService.isTokenValid(token)) {

            filterChain.doFilter(request,response);
            return;
        }



        String email =
                jwtService.extractEmail(token);


        Long userId =
                jwtService.extractUserId(token);



        String role =
                jwtService.extractRole(token);



        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        userId,
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_" +
                                                (role != null ? role : "USER")
                                )
                        )
                );



        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        System.out.println("JWT FILTER HIT");
        System.out.println("EMAIL : " + email);
        System.out.println("USER ID : " + userId);
        System.out.println("ROLE : " + role);

        filterChain.doFilter(request,response);

    }

}