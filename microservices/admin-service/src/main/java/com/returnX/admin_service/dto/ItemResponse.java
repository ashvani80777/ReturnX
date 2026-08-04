package com.returnX.admin_service.dto;

import com.returnX.admin_service.enums.ItemStatus;
import com.returnX.admin_service.enums.ItemType;
import com.returnX.item_service.enums.ItemCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
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