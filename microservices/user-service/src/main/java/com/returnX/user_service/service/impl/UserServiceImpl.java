package com.returnX.user_service.service.impl;


import com.returnX.user_service.dto.request.CreateUserRequest;
import com.returnX.user_service.dto.request.UpdateUserRequest;
import com.returnX.user_service.dto.response.UserResponse;
import com.returnX.user_service.entity.User;
import com.returnX.user_service.exception.ResourceAlreadyExistsException;
import com.returnX.user_service.exception.ResourceNotFoundException;
import com.returnX.user_service.mapper.UserMapper;
import com.returnX.user_service.repository.UserRepository;
import com.returnX.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }


    @Override
    public UserResponse createProfile(CreateUserRequest request) {
        if(userRepository.existsByAuthUserId((request.getAuthUserId()))){
            throw new ResourceAlreadyExistsException(
                    "Profile already exists for this user.");
        }
        if(request.getEmployeeId()!=null
                &&!request.getEmployeeId().isBlank()
                &&userRepository.existsByEmployeeId(request.getEmployeeId())
        ){
            throw new ResourceAlreadyExistsException(
                    "Employee ID already exists.");
        }

        User user=userMapper.toEntity(request);
        user=userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse getProfile(Long authUserId) {
        User user=userRepository.findByAuthUserIdAndDeletedFalse(authUserId).orElseThrow(()->new ResourceNotFoundException("Profile not found"));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user=userRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        return userMapper.toResponse(user);
    }

    @Override
    public Page<UserResponse> getAllUsers(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("desc")?
                Sort.by(sortBy).descending()
                :Sort.by(sortBy).ascending();

        Pageable pageable= PageRequest.of(page,size,sort);
        return userRepository
                .findAllByDeletedFalse(pageable)
                .map(userMapper::toResponse);
    }

    @Override
    public UserResponse updateProfile(Long id, UpdateUserRequest request) {
        User user=userRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        if(request.getEmployeeId()!=null
                &&!request.getEmployeeId().isBlank()
                &&!request.getEmployeeId().equals(user.getEmployeeId())){
            userRepository.findByEmployeeId(request.getEmployeeId()).ifPresent(existingUser->{
                throw new ResourceNotFoundException("Employee already exists");
            });
        }
        userMapper.updateEntity(user,request);
        User updatedUser=userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Override
    public void deleteProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }
    @Override
    public Page<UserResponse> searchUsers(
            String keyword,
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return userRepository
                .searchUsers(keyword, pageable)
                .map(userMapper::toResponse);
    }
}
