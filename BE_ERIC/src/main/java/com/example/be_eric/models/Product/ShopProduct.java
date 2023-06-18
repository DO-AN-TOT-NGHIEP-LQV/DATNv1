package com.example.be_eric.models.Product;


import com.example.be_eric.models.Shop;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "shop_product")
public class ShopProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull
    private  double price;

    @NotNull
    private  int quantity;

    @NotNull
    private String link;

    public ShopProduct(Shop shop, Product product, double price, int quantity, String link) {
        this.shop = shop;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.link = link;
    }
}