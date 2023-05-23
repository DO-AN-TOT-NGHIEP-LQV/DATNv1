package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    Product save(Product product);
    List<Product> getAll();
    void addImageToProduct(Product product, Image image) ;

    Product getById( Long id);
    Page<Product> searchByText(String searchText, Pageable pageable);

    List<Product> searchByTextNotPageable(String searchText);

}