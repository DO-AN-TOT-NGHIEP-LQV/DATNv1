package com.example.be_eric.repository;


import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ShopProductRepository extends JpaRepository<ShopProduct, Long> {

    boolean existsByProduct_IdAndShop_Id(Long productId, Long shopId);




}
