package com.example.be_eric.controllers;


import com.example.be_eric.models.User;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.ultils.Exception.DuplicateValueException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class ProductControler {


    @Autowired
    private ProductService productService;

//    @PutMapping ("/user/product/updateView")
//    public ResponseEntity<?> updateView(@RequestParam Long productId) {
//        try {
//
//            boolean result =  productService.updateViews(productId);
//            if(result)
//                return ResponseEntity.ok().build();
//            else
//                return ResponseEntity.badRequest()
//                    .body(new ErrorResponse("Không thể cập nhật lượt View"));
//        }
//        catch (ObjectOptimisticLockingFailureException ox){
//            System.out.println(ox.getMessage());
//
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse("Lỗi xung đột dữ liệu"));
//        }catch (Exception e) {
//            System.out.println(e.getMessage());
//            return ResponseEntity.badRequest()
//                    .body(new ErrorResponse(e.getMessage()));
//        }
//    }

}
