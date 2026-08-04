package com.returnX.item_service.config;

import com.returnX.item_service.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    )
            throws Exception {


        http
                .csrf(csrf -> csrf.disable())


                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                .authorizeHttpRequests(auth -> auth



                        // Public APIs (purane wale same)
                        .requestMatchers(
                                "/actuator/**",
                                "/items/lost",
                                "/items/found",
                                "/items/search",
                                "/items/category/**"
                        )
                        .permitAll()


                        .requestMatchers(
                                "/items/admin/**"
                        )
                        .hasRole("ADMIN")



                        .anyRequest()
                        .authenticated()

                )



                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }

}