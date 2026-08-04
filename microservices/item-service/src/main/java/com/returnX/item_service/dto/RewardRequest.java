package com.returnX.item_service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardRequest {

    private String userEmail;

    private Integer points;

    private String actionType;

    private String reason;

    private String referenceType;

    private Long referenceId;
}