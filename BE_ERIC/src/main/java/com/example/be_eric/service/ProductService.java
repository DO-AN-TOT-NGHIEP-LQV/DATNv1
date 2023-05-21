package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface ProductService {

    Product save(Product product);
    List<Product> getAll();
    void addImageToProduct(Product product, Image image) ;

    Product getById( Long id);

}