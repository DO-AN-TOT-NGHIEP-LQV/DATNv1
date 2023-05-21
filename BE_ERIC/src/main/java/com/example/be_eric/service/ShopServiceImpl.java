package com.example.be_eric.service;


import com.example.be_eric.models.Shop;
import com.example.be_eric.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private  ShopRepository shopRepo;

    @Override
    public Shop save(Shop shop) {
        return shopRepo.save(shop);
    }

    @Override
    public Boolean delete(Shop shop) {
        return null;
    }

    @Override
    public Shop getById(int id) {
        return shopRepo.findById( Long.valueOf(id)).orElse(null);
    }

    @Override
    public Shop getByUser(Long userId) {
        return null;
    }

    @Override
    public Shop addUser(Long shopId, Long userId) {
        return null;
    }

    @Override
    public List<Shop> getAllShop() {
        return shopRepo.findAll();
    }
}
