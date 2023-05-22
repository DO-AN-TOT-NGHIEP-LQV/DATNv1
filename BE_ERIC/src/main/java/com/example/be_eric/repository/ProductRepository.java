package com.example.be_eric.repository;

import com.example.be_eric.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product>  findProductsByNameContainingOrDescriptionContaining   (String content,String content2, Pageable pageable);
    List<Product> findProductsByNameContainingOrDescriptionContaining   (String content, String content2);

}
