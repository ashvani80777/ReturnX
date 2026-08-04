package com.returnX.auth_service.service.Impl;

import com.returnX.auth_service.dto.*;
import com.returnX.auth_service.entity.User;
import com.returnX.auth_service.enums.Role;
import com.returnX.auth_service.exception.*;
import com.returnX.auth_service.jwt.JwtService;
import com.returnX.auth_service.repository.UserRepository;
import com.returnX.auth_service.service.AuthService;
import com.returnX.auth_service.service.client.*;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
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
    private final NotificationClient notificationClient;
    private final RewardClient rewardClient;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager, JwtService jwtService,
                           UserClient userClient, NotificationClient notificationClient,
                           RewardClient rewardClient) {
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
        this.jwtService=jwtService;
        this.userClient=userClient;
        this.notificationClient=notificationClient;
        this.rewardClient=rewardClient;
    }

    @Override
    @Transactional
    public void register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail()))
            throw new EmailAlreadyExistsException("Email already registered");

        User user=new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User saved=userRepository.save(user);

        CreateUserRequest profile=new CreateUserRequest();
        profile.setAuthUserId(saved.getId());
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setPhoneNumber(request.getPhoneNumber());
        profile.setAddress(request.getAddress());

        userClient.createUser(profile);

        rewardClient.createReward(
                RewardRequest.builder()
                        .userEmail(saved.getEmail())
                        .points(50)
                        .actionType("FIRST_REGISTER")
                        .reason("First Registration Bonus")
                        .referenceType("USER")
                        .referenceId(saved.getId())
                        .build()
        );

        notificationClient.createNotification(
                CreateNotificationRequest.builder()
                        .userEmail(saved.getEmail())
                        .title("Welcome to ReturnX")
                        .message("Your account has been created successfully")
                        .type("WELCOME")
                        .referenceId(String.valueOf(saved.getId()))
                        .referenceType("USER")
                        .build()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );

        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        return new AuthResponse(
                jwtService.generateToken(user.getEmail(),user.getId()),
                user.getEmail(),
                user.getRole().name()
        );
    }

    @Override
    public UserResponse getCurrentUser(){
        String email=SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        return new UserResponse(user.getId(),user.getEmail(),user.getRole());
    }

    @Override
    public void changePassword(ChangePasswordRequest request){
        String email=SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        if(!passwordEncoder.matches(request.getOldPassword(),user.getPassword()))
            throw new InvalidPasswordException("Old password is incorrect");

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void logout(){}


    @Override
    public void deleteUser(Long id){

        userRepository.deleteById(id);

    }
}