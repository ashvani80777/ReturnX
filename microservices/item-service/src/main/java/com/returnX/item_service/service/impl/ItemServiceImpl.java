package com.returnX.item_service.service.impl;

import com.returnX.item_service.ItemNotFoundException;
import com.returnX.item_service.dto.*;
import com.returnX.item_service.entity.Item;
import com.returnX.item_service.enums.*;
import com.returnX.item_service.exception.UnauthorizedException;
import com.returnX.item_service.repository.ItemRepository;
import com.returnX.item_service.service.*;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ImageUploadService imageUploadService;

    public ItemServiceImpl(ItemRepository itemRepository,
                           ImageUploadService imageUploadService) {
        this.itemRepository = itemRepository;
        this.imageUploadService = imageUploadService;
    }

    @Override
    public ItemResponse createLostItem(CreateItemRequest request,
                                       MultipartFile image,
                                       String ownerEmail) {

        return createItem(request, image, ownerEmail,
                ItemType.LOST, ItemStatus.LOST);
    }

    @Override
    public ItemResponse createFoundItem(CreateItemRequest request,
                                        MultipartFile image,
                                        String ownerEmail) {

        return createItem(request, image, ownerEmail,
                ItemType.FOUND, ItemStatus.FOUND);
    }


    private ItemResponse createItem(CreateItemRequest request,
                                    MultipartFile image,
                                    String ownerEmail,
                                    ItemType type,
                                    ItemStatus status) {

        Item item = new Item();

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());

        item.setImageUrl(imageUploadService.uploadImage(image));

        item.setType(type);
        item.setStatus(status);
        item.setOwnerEmail(ownerEmail);
        item.setEventDate(LocalDate.now());

        return mapToResponse(itemRepository.save(item));
    }


    @Override
    public ItemResponse updateItem(Long itemId,
                                   UpdateItemRequest request,
                                   String ownerEmail) {

        Item item = findItem(itemId);

        checkOwnership(item, ownerEmail);

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());

        return mapToResponse(itemRepository.save(item));
    }


    @Override
    public ItemResponse getItemById(Long itemId) {
        return mapToResponse(findItem(itemId));
    }


    @Override
    public List<ItemResponse> getLostItems() {
        return itemRepository
                .findByTypeAndStatus(
                        ItemType.LOST,
                        ItemStatus.LOST,
                        Pageable.unpaged())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public List<ItemResponse> getFoundItems() {
        return itemRepository
                .findByTypeAndStatus(
                        ItemType.FOUND,
                        ItemStatus.FOUND,
                        Pageable.unpaged())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public List<ItemResponse> getMyItems(String ownerEmail) {
        return itemRepository
                .findByOwnerEmail(ownerEmail, Pageable.unpaged())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public List<ItemResponse> searchItems(String keyword) {
        return itemRepository
                .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrLocationContainingIgnoreCase(
                        keyword, keyword, keyword, Pageable.unpaged())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public List<ItemResponse> getItemsByCategory(ItemCategory category) {
        return itemRepository
                .findByCategory(category, Pageable.unpaged())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public void markAsReturned(Long itemId, String ownerEmail) {

        Item item = findItem(itemId);

        checkOwnership(item, ownerEmail);

        item.setStatus(ItemStatus.RETURNED);

        itemRepository.save(item);
    }


    @Override
    public void deleteItem(Long itemId, String ownerEmail) {

        Item item = findItem(itemId);

        checkOwnership(item, ownerEmail);

        itemRepository.delete(item);
    }


    private Item findItem(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() ->
                        new ItemNotFoundException("Item not found"));
    }


    private void checkOwnership(Item item, String email) {

        if (!item.getOwnerEmail().equals(email)) {
            throw new UnauthorizedException("You are not authorized");
        }
    }


    private ItemResponse mapToResponse(Item item) {

        return new ItemResponse(
                item.getId(),
                item.getTitle(),
                item.getDescription(),
                item.getCategory(),
                item.getType(),
                item.getStatus(),
                item.getLocation(),
                item.getImageUrl(),
                item.getOwnerEmail(),
                item.getCreatedAt()
        );
    }
}
