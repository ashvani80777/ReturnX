package com.returnX.user_service.repository;

import com.returnX.user_service.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByAuthUserIdAndDeletedFalse(Long authUserId);

    Optional<User> findByIdAndDeletedFalse(Long id);

    Optional<User> findByEmployeeId(String employeeId);

    Optional<User> findByEmployeeIdAndDeletedFalse(String employeeId);

    boolean existsByAuthUserId(Long authUserId);

    boolean existsByEmployeeId(String employeeId);

    Page<User> findAllByDeletedFalse(Pageable pageable);

    @Query("""
    SELECT u FROM User u
    WHERE u.deleted = false
    AND (
        LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.employeeId) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.department) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))
    )
""")
    Page<User> searchUsers(String keyword, Pageable pageable);
}
