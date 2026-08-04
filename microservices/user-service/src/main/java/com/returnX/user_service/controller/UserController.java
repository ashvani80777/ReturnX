package com.returnX.user_service.controller;

import com.returnX.user_service.dto.request.CreateUserRequest;
import com.returnX.user_service.dto.request.UpdateUserRequest;
import com.returnX.user_service.dto.response.UserResponse;
import com.returnX.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createProfile(
            @Valid @RequestBody CreateUserRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.createProfile(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyProfile(
            Authentication authentication) {


        System.out.println("ME API HIT");

        System.out.println(
                "AUTH ID : " + authentication.getCredentials()
        );


        Long authUserId =
                (Long) authentication.getCredentials();


        UserResponse response =
                userService.getProfile(authUserId);


        System.out.println(response);


        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {

        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/profile/{authUserId}")
    public ResponseEntity<UserResponse> getProfile(
            @PathVariable Long authUserId) {

        return ResponseEntity.ok(userService.getProfile(authUserId));
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return ResponseEntity.ok(
                userService.getAllUsers(page, size, sortBy, sortDir));
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        return ResponseEntity.ok(
                userService.updateProfile(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id) {

        userService.deleteProfile(id);

        return ResponseEntity.ok("Profile deleted successfully.");
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserResponse>> searchUsers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return ResponseEntity.ok(
                userService.searchUsers(
                        keyword,
                        page,
                        size,
                        sortBy,
                        sortDir));
    }

}