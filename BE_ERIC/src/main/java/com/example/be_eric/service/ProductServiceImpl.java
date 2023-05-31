package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.repository.ProductRepository;
import com.example.be_eric.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
    @Transactional
    public void addImageToProduct(Product product, Image image) {
//        image.setIsProductImage(true);
//        product.getImages().add(image);
//        productRepo.save(product);

        Optional<Product> optionalPost = productRepo.findById(product.getId());
        if (optionalPost.isPresent()) {
            Product newpost = optionalPost.get();
            image.setIsProductImage(true);
            newpost.getImages().add(image);
            productRepo.save(newpost);
        }
    }

    @Override
    public Product getById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    @Override
    public Page<Product> searchByText(String searchText, Pageable pageable) {
        return productRepo.findProductsByNameContainingOrDescriptionContaining(searchText,  searchText, pageable);
    }

    @Override
    public List<Product> searchByTextNotPageable(String searchText) {
        return productRepo.findProductsByNameContainingOrDescriptionContaining(searchText,  searchText);
    }

    @Override
    public Page<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice, Pageable pageable) {
        return productRepo.findAll(ProductSpecifications.searchAndFilter(keyword, types, brands, minPrice, maxPrice),pageable);

    }

    @Override
    public List<Product> searchAndFilterProducts(String keyword, String[] types, String[] brands, Double minPrice, Double maxPrice) {
        return productRepo.findAll(ProductSpecifications.searchAndFilter(keyword, types, brands, minPrice, maxPrice));

    }

}
