package com.returnX.notification_service.repository;

import com.returnX.notification_service.entity.Notification;
import com.returnX.notification_service.enums.NotificationStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByUserEmailOrderByCreatedAtDesc(String userEmail, Pageable pageable);

    List<Notification> findByUserEmailAndStatusOrderByCreatedAtDesc(String userEmail, NotificationStatus status);

    Optional<Notification> findByIdAndUserEmail(Long id, String userEmail);

    long countByUserEmailAndStatus(String userEmail, NotificationStatus status);

    List<Notification> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    @Transactional
    void deleteByUserEmail(String userEmail);
}