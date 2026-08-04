package com.returnX.reward_service.dto;

import com.returnX.reward_service.enums.ReferenceType;
import com.returnX.reward_service.enums.RewardAction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardCreateRequest {


    @NotBlank
    private String userEmail;


    @NotNull
    private Integer points;


    @NotNull
    private RewardAction actionType;


    @NotBlank
    private String reason;


    @NotNull
    private ReferenceType referenceType;


    @NotNull
    private Long referenceId;

}