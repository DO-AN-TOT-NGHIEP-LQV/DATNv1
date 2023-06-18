package com.example.be_eric.controllers;


import com.example.be_eric.DTO.ShopProductDTO;
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

import java.util.List;

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

//        @PostMapping(value = "/sale/shop/addProductVentor",
//                consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> addProductVentor(@RequestBody ShopProduct shopProduct)
//    {
//
//        System.out.println(shopProduct.getPrice());
//        return null;
//    }


//    @GetMapping(value = "/sale/shop/getPost",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> getPost()
//    {
//        try {
//
//            Post responeList = postService.getPostById(1L);
//            return ResponseEntity.ok().body(responeList);
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body(e);
//        }
//    }


//    @GetMapping(value = "/sale/shop/getCountProductOfShop",
//            consumes = {MediaType.APPLICATION_JSON_VALUE,
//                    MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> getCountProductOfShop()
//    {
//        try {
//
//            Post responeList = postService.getPostById(1L);
//            return ResponseEntity.ok().body(responeList);
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body(e);
//        }
//    }
}
