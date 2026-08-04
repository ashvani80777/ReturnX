package com.returnX.admin_service.client;


import com.returnX.admin_service.config.FeignConfig;
import com.returnX.admin_service.dto.ItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@FeignClient(
        name="ITEM-SERVICE",
        configuration = FeignConfig.class
)
public interface ItemServiceClient {



    @GetMapping("/items/lost")
    List<ItemResponse> getLostItems();



    @GetMapping("/items/found")
    List<ItemResponse> getFoundItems();



    @DeleteMapping("/items/admin/{itemId}")
    void deleteItem(
            @PathVariable Long itemId
    );



    @PutMapping("/items/admin/{itemId}/returned")
    String markReturned(
            @PathVariable Long itemId
    );

    @DeleteMapping("/items/admin/user")
    void deleteAllUserItems(@RequestParam("email") String email);

}