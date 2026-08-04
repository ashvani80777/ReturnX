package com.returnX.admin_service.controller;

import com.returnX.admin_service.dto.DashboardResponse;
import com.returnX.admin_service.dto.UserResponse;
import com.returnX.admin_service.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminDashboardController {


    private final AdminDashboardService adminDashboardService;


    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> dashboard() {

        return ResponseEntity.ok(
                adminDashboardService.getDashboard()
        );
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id
    ){

        adminDashboardService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(
            @PathVariable Long id
    ){

        adminDashboardService.deleteItem(id);

        return ResponseEntity.ok(
                "Item deleted successfully"
        );
    }





    @PutMapping("/items/{id}/returned")
    public ResponseEntity<String> markItemReturned(
            @PathVariable Long id
    ){

        adminDashboardService.markItemReturned(id);

        return ResponseEntity.ok(
                "Item marked as returned successfully"
        );
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> users(){

        return ResponseEntity.ok(
                adminDashboardService.getDashboard()
                        .getUsers()
        );

    }

}