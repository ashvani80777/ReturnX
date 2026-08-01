package com.returnX.auth_service.service.Impl;

import com.returnX.auth_service.dto.*;
import com.returnX.auth_service.entity.User;
import com.returnX.auth_service.enums.Role;
import com.returnX.auth_service.exception.EmailAlreadyExistsException;
import com.returnX.auth_service.exception.InvalidPasswordException;
import com.returnX.auth_service.jwt.JwtService;
import com.returnX.auth_service.repository.UserRepository;
import com.returnX.auth_service.service.AuthService;
import com.returnX.auth_service.service.client.UserClient;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserClient userClient;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager, JwtService jwtService, UserClient userClient){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
        this.jwtService=jwtService;
        this.userClient=userClient;
    }

    @Override
    @Transactional
    public void register(RegisterRequest request) {

        if(userRepository.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User user=new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser=userRepository.save(user);

        CreateUserRequest profileRequest=new CreateUserRequest();
        profileRequest.setAuthUserId(savedUser.getId());
        profileRequest.setFirstName(request.getFirstName());
        profileRequest.setLastName(request.getLastName());
        profileRequest.setPhoneNumber(request.getPhoneNumber());
        profileRequest.setAddress(request.getAddress());
        try {

            userClient.createUser(profileRequest);

        }
        catch (Exception e) {

            throw new RuntimeException(
                    "User service unavailable"
            );

        }
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        String token= jwtService.generateToken(user.getEmail(),user.getId());

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }

    @Override
    public UserResponse getCurrentUser() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();

        String email=authentication.getName();

        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        String email=authentication.getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User ot found"));

        if(!passwordEncoder.matches(request.getOldPassword(),user.getPassword())){
            throw new InvalidPasswordException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void logout() {
        //we make jwt stateless so client could delete the token
    }
}
