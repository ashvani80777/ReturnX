package com.returnX.item_service.dto;

import com.returnX.item_service.enums.ItemCategory;
import com.returnX.item_service.enums.ItemStatus;
import com.returnX.item_service.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponse {

    private Long id;

    private String title;

    private String description;

    private ItemCategory category;

    private ItemType type;

    private ItemStatus status;

    private String location;

    private String imageUrl;

    private String ownerEmail;

    private LocalDateTime createdAt;

}