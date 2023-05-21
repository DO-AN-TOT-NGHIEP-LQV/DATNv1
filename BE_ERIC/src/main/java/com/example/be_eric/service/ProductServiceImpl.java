package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.models.Product;
import com.example.be_eric.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements  ProductService{

    @Autowired
    private ProductRepository productRepo;

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public void addImageToProduct(Product product, Image image) {
        image.setIsProductImage(true);
        product.getImages().add(image);
        productRepo.save(product);
    }

    @Override
    public Product getById(Long id) {
        return productRepo.findById(id).orElse(null);
    }


}
