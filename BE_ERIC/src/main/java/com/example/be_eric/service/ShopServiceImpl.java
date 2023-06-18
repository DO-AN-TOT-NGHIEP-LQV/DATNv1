package com.example.be_eric.service;


import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import com.example.be_eric.repository.ShopProductRepository;
import com.example.be_eric.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepo;

    @Autowired
    ShopProductRepository shopProductRepository;

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
        return shopRepo.findById(Long.valueOf(id)).orElse(null);
    }

    @Override
    public Shop getById(Long id) {
        return shopRepo.findById(id).orElse(null);
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

    @Override
    public List<ShopProductDetailDTO> getShopByProductId(Long productId) {
        return shopRepo.findShopsByProductId(productId);
    }


    //////////
    @Override
    public boolean existsByProduct_IdAndShop_Id(Long productId, Long ShopId) {
        return shopProductRepository.existsByProduct_IdAndShop_Id(productId, ShopId);
    }

    @Override
    public ShopProduct saveShopProduct(ShopProduct shopProduct) {
        return shopProductRepository.save(shopProduct);
    }


}
