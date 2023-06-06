package com.example.be_eric.models.Product;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Shop;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties("user_id")
//@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(columnDefinition = "TEXT")

//    @NotNull
    private String description;

//    @NotNull
    private int quantity;

    private double  originalPrice = 0;

//    @NotNull
    private double  price = 0;

//    @NotNull
    private String type;

    private String brand;

//    private String status;

    @Column(name = "count_views", columnDefinition = "bigint default 0")
    private Long  countViews;

//    Not null
    private String link;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "product_images",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private List<Image> images =  new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
//    @JsonIdentityReference(alwaysAsId = true)
//    @JsonProperty("shop_id")
    @JsonManagedReference
    @JoinColumn(name = "shop_id", updatable = false)
    private Shop shop;

    public Product(Long id, String name, String description, int quantity, double  price, Shop shop) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.shop = shop;
    }

    public Product(Long id, String name, String description, int quantity, String type, String brand, Shop shop) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.type = type;
        this.brand = brand;
        this.shop = shop;
    }

    public Product(Long id, String name, String description, int quantity, double  originalPrice , double  price, Shop shop) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.shop = shop;
        this.originalPrice = originalPrice;
    }

    // Thêm thuộc tính created_at và chú thích @CreationTimestamp
    @CreationTimestamp
    private LocalDateTime created_at;

    // Thêm thuộc tính updated_at và chú thích @UpdateTimestamp
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
