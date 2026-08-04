package com.returnX.reward_service.repository;

import com.returnX.reward_service.entity.Reward;
import com.returnX.reward_service.enums.RewardAction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward,Long> {


    @Query("""
            SELECT COALESCE(SUM(r.points),0)
            FROM Reward r
            WHERE r.userEmail = :email
            """)
    Integer findTotalPointsByUserEmail(String email);



    Long countByUserEmail(String email);



    List<Reward> findTop5ByUserEmailOrderByCreatedAtDesc(String email);



    boolean existsByUserEmailAndActionTypeAndReferenceId(
            String userEmail,
            RewardAction actionType,
            Long referenceId
    );

    List<Reward> findByUserEmailOrderByCreatedAtDesc(String email);


    @Query("""
        SELECT r.userEmail, SUM(r.points)
        FROM Reward r
        GROUP BY r.userEmail
        ORDER BY SUM(r.points) DESC
        """)
    List<Object[]> findLeaderboard();

    boolean existsByUserEmailAndActionType(
            String userEmail,
            String actionType
    );

    @Transactional
    void deleteByUserEmail(String userEmail);

}