package com.returnX.admin_service.service.impl;

import com.returnX.admin_service.client.*;
import com.returnX.admin_service.dto.*;
import com.returnX.admin_service.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserServiceClient userServiceClient;
    private final ItemServiceClient itemServiceClient;
    private final RewardServiceClient rewardServiceClient;
    private final AuthServiceClient authServiceClient;
    private final ClaimServiceClient claimServiceClient;
    private final NotificationServiceClient notificationServiceClient;
    private final ChatServiceClient chatServiceClient;

    @Override
    public DashboardResponse getDashboard() {
        UserPageResponse userPage = userServiceClient.getAllUsers();
        List<UserResponse> users = (userPage != null && userPage.getContent() != null)
                ? userPage.getContent()
                : List.of();

        List<ItemResponse> allItems = itemServiceClient.getAllItems();
        if (allItems == null) {
            allItems = List.of();
        }
        long lostCount = allItems.stream()
                .filter(item -> item.getType() != null && "LOST".equalsIgnoreCase(item.getType().name()))
                .count();

        long foundCount = allItems.stream()
                .filter(item -> item.getType() != null && "FOUND".equalsIgnoreCase(item.getType().name()))
                .count();

        long returnedCount = allItems.stream()
                .filter(item -> item.getStatus() != null && "RETURNED".equalsIgnoreCase(item.getStatus().name()))
                .count();

        return DashboardResponse.builder()
                .totalUsers(users.size())
                .totalLostItems(lostCount)
                .totalFoundItems(foundCount)
                .totalReturnedItems(returnedCount)
                .users(users)
                .items(allItems)
                .leaderboard(rewardServiceClient.getLeaderboard())
                .build();
    }

    @Override
    public void deleteUser(Long userId) {
        UserResponse user = userServiceClient.getUserById(userId);

        if (user != null) {
            String email = user.getEmail();

            if (email != null && !email.trim().isEmpty()) {
                String cleanEmail = email.trim().toLowerCase();

                try {
                    itemServiceClient.deleteAllUserItems(cleanEmail);
                } catch (Exception e) {
                    System.err.println("Failed to delete user items: " + e.getMessage());
                }

                try {
                    claimServiceClient.deleteAllUserClaims(cleanEmail);
                } catch (Exception e) {
                    System.err.println("Failed to delete user claims: " + e.getMessage());
                }

                try {
                    rewardServiceClient.deleteUserRewards(cleanEmail);
                    System.out.println("Successfully called Reward Service deletion for email: " + cleanEmail);
                } catch (Exception e) {
                    System.err.println("Failed to delete user rewards: " + e.getMessage());
                }

                try {
                    notificationServiceClient.deleteUserNotifications(cleanEmail);
                } catch (Exception e) {
                    System.err.println("Failed to delete user notifications: " + e.getMessage());
                }

                try {
                    chatServiceClient.deleteUserMessages(cleanEmail);
                } catch (Exception e) {
                    System.err.println("Failed to delete user chat messages: " + e.getMessage());
                }
            }

            if (user.getAuthUserId() != null) {
                try {
                    authServiceClient.deleteAuthUser(user.getAuthUserId());
                } catch (Exception e) {
                    System.err.println("Error deleting auth user: " + e.getMessage());
                }
            }
        }

        userServiceClient.deleteUser(userId);
    }

    @Override
    public void deleteItem(Long itemId) {
        itemServiceClient.deleteItem(itemId);
    }

    @Override
    public void markItemReturned(Long itemId) {
        itemServiceClient.markReturned(itemId);
    }
}