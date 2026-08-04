package com.returnX.admin_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserPageResponse {

    private List<UserResponse> content;

    private long totalElements;

}