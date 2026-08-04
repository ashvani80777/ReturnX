package com.returnX.admin_service.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RewardResponse {

    private Long id;

    private Integer points;

    private String actionType;

    private String reason;

    private String referenceType;

    private Long referenceId;

    private LocalDateTime createdAt;
}