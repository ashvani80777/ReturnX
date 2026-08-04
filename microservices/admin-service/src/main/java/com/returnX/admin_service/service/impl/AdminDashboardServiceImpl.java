package com.returnX.admin_service.service.impl;


import com.returnX.admin_service.client.*;
import com.returnX.admin_service.dto.*;
import com.returnX.admin_service.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl
        implements AdminDashboardService {



    private final UserServiceClient userServiceClient;
    private final ItemServiceClient itemServiceClient;
    private final RewardServiceClient rewardServiceClient;
    private final AuthServiceClient authServiceClient;
    private final ClaimServiceClient claimServiceClient;
    private final NotificationServiceClient notificationServiceClient;
    private final  ChatServiceClient chatServiceClient;

    @Override
    public DashboardResponse getDashboard(){
        UserPageResponse userPage =
                userServiceClient.getAllUsers();
        List<UserResponse> users =
                userPage.getContent();
        List<ItemResponse> lost =
                itemServiceClient.getLostItems();
        List<ItemResponse> found =
                itemServiceClient.getFoundItems();

        List<ItemResponse> allItems =
                new ArrayList<>();
        allItems.addAll(lost);
        allItems.addAll(found);

        long returned =
                allItems.stream()
                        .filter(item ->
                                item.getStatus()!=null &&
                                        item.getStatus()
                                                .name()
                                                .equals("RETURNED")
                        )
                        .count();

        return DashboardResponse.builder()
                .totalUsers(users.size())
                .totalLostItems(lost.size())
                .totalFoundItems(found.size())
                .totalReturnedItems(returned)
                .users(users)
                .items(allItems)
                .leaderboard(
                        rewardServiceClient.getLeaderboard()
                )
                .build();

    }





    @Override
    public void deleteUser(Long userId) {
        UserResponse user = userServiceClient.getUserById(userId);
        userServiceClient.deleteUser(userId);
        if (user.getEmail() != null) {
            itemServiceClient.deleteAllUserItems(user.getEmail());
            claimServiceClient.deleteAllUserClaims(user.getEmail());
            rewardServiceClient.deleteUserRewards(user.getEmail());
            notificationServiceClient.deleteUserNotifications(user.getEmail());
            chatServiceClient.deleteUserMessages(user.getEmail());
        }
        authServiceClient.deleteAuthUser(user.getAuthUserId());
    }




    @Override
    public void deleteItem(Long itemId){

        itemServiceClient.deleteItem(itemId);

    }




    @Override
    public void markItemReturned(Long itemId){

        itemServiceClient.markReturned(itemId);

    }

}