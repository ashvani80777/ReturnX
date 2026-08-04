package com.returnX.item_service.repository;

import com.returnX.item_service.entity.Item;
import com.returnX.item_service.enums.ItemCategory;
import com.returnX.item_service.enums.ItemStatus;
import com.returnX.item_service.enums.ItemType;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {


    Page<Item> findByOwnerEmail(
            String ownerEmail,
            Pageable pageable
    );


    Page<Item> findByTypeAndStatus(
            ItemType type,
            ItemStatus status,
            Pageable pageable
    );


    Page<Item> findByCategory(
            ItemCategory category,
            Pageable pageable
    );


    Page<Item> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrLocationContainingIgnoreCase(
            String title,
            String description,
            String location,
            Pageable pageable
    );

    @Transactional
    void deleteByOwnerEmail(String ownerEmail);

}