package com.returnX.item_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.returnX.item_service.dto.CreateItemRequest;
import com.returnX.item_service.dto.ItemResponse;
import com.returnX.item_service.dto.UpdateItemRequest;
import com.returnX.item_service.enums.ItemCategory;
import com.returnX.item_service.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;
    private final ObjectMapper objectMapper;

    public ItemController(ItemService itemService, ObjectMapper objectMapper) {
        this.itemService = itemService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/lost", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemResponse> createLostItem(
            @RequestPart("data") String data,
            @RequestPart("image") MultipartFile image,
            Authentication auth) throws Exception {

        CreateItemRequest request = objectMapper.readValue(data, CreateItemRequest.class);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(itemService.createLostItem(request, image, auth.getName()));
    }

    @PostMapping(value = "/found", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemResponse> createFoundItem(
            @RequestPart("data") String data,
            @RequestPart("image") MultipartFile image,
            Authentication auth) throws Exception {

        CreateItemRequest request = objectMapper.readValue(data, CreateItemRequest.class);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(itemService.createFoundItem(request, image, auth.getName()));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ItemResponse> updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateItemRequest request,
            Authentication auth) {

        return ResponseEntity.ok(itemService.updateItem(itemId, request, auth.getName()));
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping("/lost")
    public ResponseEntity<List<ItemResponse>> getLostItems() {
        return ResponseEntity.ok(itemService.getLostItems());
    }

    @GetMapping("/found")
    public ResponseEntity<List<ItemResponse>> getFoundItems() {
        return ResponseEntity.ok(itemService.getFoundItems());
    }

    @GetMapping("/my-items")
    public ResponseEntity<List<ItemResponse>> getMyItems(Authentication auth) {
        return ResponseEntity.ok(itemService.getMyItems(auth.getName()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemResponse>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(itemService.searchItems(keyword));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemResponse>> byCategory(@PathVariable ItemCategory category) {
        return ResponseEntity.ok(itemService.getItemsByCategory(category));
    }

    @PutMapping("/{itemId}/returned")
    public ResponseEntity<String> markReturned(@PathVariable Long itemId, Authentication auth) {
        itemService.markAsReturned(itemId, auth.getName());
        return ResponseEntity.ok("Item marked as returned successfully");
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Long itemId, Authentication auth) {
        itemService.deleteItem(itemId, auth.getName());
        return ResponseEntity.ok("Item deleted successfully");
    }
}
