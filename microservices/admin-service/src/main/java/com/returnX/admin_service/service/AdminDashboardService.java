package com.returnX.admin_service.service;


import com.returnX.admin_service.dto.DashboardResponse;


public interface AdminDashboardService {


    DashboardResponse getDashboard();



    void deleteUser(Long userId);



    void deleteItem(Long itemId);



    void markItemReturned(Long itemId);

}