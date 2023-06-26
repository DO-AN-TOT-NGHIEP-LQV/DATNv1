package com.example.be_eric.controllers;


import com.example.be_eric.DTO.ShopProductDTO;
import com.example.be_eric.DTO.ShopProductDetailDTO;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.models.Product.ShopProduct;
import com.example.be_eric.models.Shop;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ShopController {


    @Autowired
    private ProductService productService;
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;


    @GetMapping(value = "/sale/shop/getShop")
    public ResponseEntity<?> searchPostByImage(@RequestParam("shopId") int shopId)
    {
        try {

            Shop responeList = shopService.getById(shopId);
            return ResponseEntity.ok().body(responeList);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(e);
        }
    }

//    @GetMapping(value = "/sale/shop/getProduct",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> getProduct()
//    {
//        try {
//
//            Product responeList = productService.getById(1L);
//            return ResponseEntity.ok().body(responeList);
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body(e);
//        }
//    }


//    @GetMapping(value = "/sale/shop/getUser",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> getUser()
//    {
//        try {
//
////            Product responeList = productService.getById(1L);
//            User responeList = userService.getUserByEmail("1@gmail.com");
//            return ResponseEntity.ok().body(responeList);
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body(e);
//        }
//    }


    // Them san pham lien ket
    @PostMapping(value = "/sale/shop/addProductVentor",
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> addProductVentor(@RequestBody ShopProductDTO shopProductDTO)
    {
        try{

            Long productId =  shopProductDTO.getProductId();
            Long shopId = shopProductDTO.getShopId();
            double price = shopProductDTO.getPrice() ;
            int quantity = shopProductDTO.getQuantity() ;
            String link = shopProductDTO.getLink();

            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            boolean checkExist = shopService.existsByProduct_IdAndShop_Id(productId, shopId);

             if( !checkExist)
            {
                ShopProduct shopProduct = new ShopProduct(shop, product, price, quantity, link );
                shopService.saveShopProduct(shopProduct);
                return ResponseEntity.ok().build();
            }
            else{
                throw  new Exception("Sản phẩm này đã tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @PatchMapping(value = "/sale/shop/updateProductVentor",
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> updateProductVentor(@RequestBody ShopProductDTO shopProductDTO)
    {
        try{
            Long productId =  shopProductDTO.getProductId();
            Long shopId = shopProductDTO.getShopId();
            double price = shopProductDTO.getPrice() ;
            int quantity = shopProductDTO.getQuantity() ;
            String link = shopProductDTO.getLink();

            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            ShopProduct shopProduct = shopService.findByProduct_IdAndShop_Id(productId, shopId);

            if( shopProduct != null)
            {
//                ShopProduct shopProduct = new ShopProduct(shop, product, price, quantity, link );
//                shopService.saveShopProduct(shopProduct);
                shopProduct.setPrice( price );
                shopProduct.setQuantity(quantity);
                shopProduct.setLink(link);

                ShopProduct updatedProduct =  shopService.saveShopProduct(shopProduct);
                return ResponseEntity.ok().body(updatedProduct);
            }
            else{
                throw  new Exception("Sản phẩm này không tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @DeleteMapping(value = "/sale/shop/deleteProductVentor")
    public ResponseEntity<?> deleteProductVentor(@RequestParam  Long productId, @RequestParam Long shopId)
    {
        try{


            Product product = productService.getById(productId);
            Shop shop = shopService.getById(shopId);

            if( product == null || shop== null ){
                throw  new Exception("Sản phẩm hoặc cửa hàng này không còn tồn tại");
            }

            ShopProduct shopProduct = shopService.findByProduct_IdAndShop_Id(productId, shopId);

            if( shopProduct != null)
            {
                 shopService.deleteShopProduct(shopProduct);
                return ResponseEntity.ok().build();
            }
            else{
                throw  new Exception("Sản phẩm này không tồn tại trong cửa hàng");
            }
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


    @GetMapping(value = "/sale/shop/getVendorProduct/{shopId}/{productId}")
    public ResponseEntity searchVendorProduct(
            @PathVariable(required = true) Long shopId,
            @PathVariable(required = true) Long productId) {
        try {

            ShopProductDetailDTO shopProduct = shopService.findProductVendor(productId, shopId);

            return ResponseEntity.ok().body(shopProduct);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }



}
