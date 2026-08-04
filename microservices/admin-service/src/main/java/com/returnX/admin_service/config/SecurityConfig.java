package com.returnX.admin_service.config;

import com.returnX.admin_service.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                .csrf(csrf ->
                        csrf.disable()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                org.springframework.security.config.http.SessionCreationPolicy.STATELESS
                        )
                )


                .authorizeHttpRequests(auth -> auth


                        .requestMatchers(
                                "/admin/auth/login"
                        )
                        .permitAll()


                        .requestMatchers(
                                "/admin/**"
                        )
                        .hasAuthority("ROLE_ADMIN")


                        .anyRequest()
                        .authenticated()

                )


                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }




    @Bean
    public CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration configuration =
                new CorsConfiguration();


        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );


        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        configuration.setAllowedHeaders(
                List.of(
                        "*"
                )
        );


        configuration.setAllowCredentials(true);



        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }

}