package com.example.be_eric.service;

import com.example.be_eric.models.Shop;

import java.util.List;

public interface ShopService {

    Shop save(Shop shop);
    Boolean delete(Shop shop);
    Shop getById( int id);
    Shop getByUser( Long userId);
    Shop addUser ( Long shopId, Long userId);

    List<Shop> getAllShop();


}
