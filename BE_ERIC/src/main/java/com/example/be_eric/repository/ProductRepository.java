package com.example.be_eric.repository;

import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Page<Product>  findProductsByNameContainingOrDescriptionContaining   (String content,String content2, Pageable pageable);
    List<Product> findProductsByNameContainingOrDescriptionContaining   (String content, String content2);

//    List<Product> findAllByShopAndNameContaining(Long shopId, String keyword);
//    List<Product> findProductsByShopAndNameContaining(Shop shop, String keyword);


    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId AND p.name LIKE %:keyword%")
    List<Product> findProductsByShopIdAndKeyword(@Param("shopId") Long shopId, @Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId AND p.id = :productId ")
    Product findProductByShopIdAndId( @Param("shopId") Long shopId, @Param("productId") Long productId);


    @Query("SELECT COUNT(p) FROM Product p WHERE p.shop.id = :shopId AND p.isFeatured = true")
    long countFeaturedProductsByShopId(@Param("shopId") Long shopId);

    @Modifying
    @Query("UPDATE Product p SET p.isFeatured  = :isFeatured WHERE p.id = :productId AND p.shop.id =:shopId ")
//    @Query("UPDATE Product p SET p.isFeatured  = CASE WHEN p.isFeatured = true THEN false ELSE true END  WHERE p.id = :productId")
    @Transactional
    void setProductFeatured(@Param("productId") Long productId, @Param("shopId") Long shopId,  @Param("isFeatured") boolean isFeatured);


}
