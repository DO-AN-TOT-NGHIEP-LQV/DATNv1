package com.example.be_eric.DTO;

import lombok.Data;


@Data
public class ProductDTO {

    private Long id;

    private String name;
    private String description;

    private double  originalPrice = 0;
    private double  price = 0;

    private String link;
    private int quantity;

    private String type;
    private String brand;


}
