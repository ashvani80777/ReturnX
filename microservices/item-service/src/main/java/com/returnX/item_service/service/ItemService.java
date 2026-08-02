package com.returnX.item_service.service;

import com.returnX.item_service.dto.CreateItemRequest;
import com.returnX.item_service.dto.ItemResponse;
import com.returnX.item_service.dto.UpdateItemRequest;
import com.returnX.item_service.enums.ItemCategory;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {


    ItemResponse createLostItem(
            CreateItemRequest request,
            MultipartFile image,
            String ownerEmail
    );


    ItemResponse createFoundItem(
            CreateItemRequest request,
            MultipartFile image,
            String ownerEmail
    );


    ItemResponse updateItem(
            Long itemId,
            UpdateItemRequest request,
            String ownerEmail
    );


    ItemResponse getItemById(
            Long itemId
    );


    List<ItemResponse> getLostItems();


    List<ItemResponse> getFoundItems();


    List<ItemResponse> getMyItems(
            String ownerEmail
    );


    List<ItemResponse> searchItems(
            String keyword
    );


    List<ItemResponse> getItemsByCategory(
            ItemCategory category
    );


    void markAsReturned(
            Long itemId,
            String ownerEmail
    );


    void deleteItem(
            Long itemId,
            String ownerEmail
    );

}