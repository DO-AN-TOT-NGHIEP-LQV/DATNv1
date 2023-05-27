package com.example.be_eric.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be_eric.DTO.MainDiscussionDTO;
import com.example.be_eric.DTO.SubDiscussionDTO;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import com.example.be_eric.models.Product;
import com.example.be_eric.models.User;
import com.example.be_eric.service.DiscussionService;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Exception.DontExistException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    @Autowired
    DiscussionService discussionService;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;


//    @GetMapping(value = "/user/product/getAllDiscussions")
//    public ResponseEntity getAllDiscussions( ) {
//        List<ProductMainDiscussion> AllDiscussions = discussionService.getAllDiscussions();
//
//        return  ResponseEntity.ok(AllDiscussions);
//    }

//    @GetMapping(value = "/user/product/getDiscussionsByProductId")
//    public ResponseEntity getAllDiscussions(@RequestParam("productId") Long productId ) {
//
//        List<ProductMainDiscussion>  responeList =  discussionService.getDiscussionsByProductId(productId);
//
//        return  ResponseEntity.ok(responeList);
//    }


    @GetMapping(value = "/user/product/getDiscussionsByProductIdPageable")
    public ResponseEntity getAllDiscussionsPageable(@RequestParam("productId") Long productId ) {

        List<MainDiscussionDTO> responeList = discussionService.getDTOMainDiscussion(productId);

        return  ResponseEntity.ok(responeList);
    }


    @PostMapping(value = "/user/product/newDiscussion")
    public ResponseEntity saveMainDiscussion( @RequestBody MainDiscussionDTO mainDiscussion, HttpServletRequest request){

        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);

            Product product = productService.getById(mainDiscussion.getProductId());
            if (product == null)
                throw new DontExistException("Sản phẩm này không còn tồn tại");

            ProductMainDiscussion newDiscussion = new ProductMainDiscussion( mainDiscussion.getMainContent(), user, product);

            return ResponseEntity.ok()
                    .body( discussionService.saveMainDiscussion(newDiscussion));

        }
        catch (DontExistException e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
        catch (Exception exception){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(exception.getMessage()));

        }
    }


    @PostMapping(value = "/user/product/newSubDiscussion")
    public ResponseEntity saveSubDiscussion(@RequestBody SubDiscussionDTO subDiscussionDTO, HttpServletRequest request){

        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);

            ProductMainDiscussion mainDiscussion = discussionService.getMainDiscussionById( subDiscussionDTO.getMainDisId());
            if( mainDiscussion == null)
                throw  new DontExistException("Đánh giá này không còn tồn tại");
            ProductSubDiscussion subDiscussion = new ProductSubDiscussion( subDiscussionDTO.getSubContent(),  user, mainDiscussion);
            discussionService.saveSubDiscussion(subDiscussion);

            return ResponseEntity.ok()
                    .body( discussionService.saveSubDiscussion(subDiscussion));

        } catch (DontExistException e){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }catch (Exception exception){
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(exception.getMessage()));

        }

    }

}
