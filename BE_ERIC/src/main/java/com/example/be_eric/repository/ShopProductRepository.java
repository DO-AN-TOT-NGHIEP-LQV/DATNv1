package com.example.be_eric.repository;


import com.example.be_eric.models.Product.ShopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShopProductRepository extends JpaRepository<ShopProduct, Long> {

    boolean existsByProduct_IdAndShop_Id(Long productId, Long shopId);

    ShopProduct findByProduct_IdAndShop_Id(Long productId, Long shopId);




}
