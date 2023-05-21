package com.example.be_eric.controllers;

import com.example.be_eric.models.Post;
import com.example.be_eric.models.Product;
import com.example.be_eric.models.Shop;
import com.example.be_eric.models.User;
import com.example.be_eric.service.PostService;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    @Autowired
    private PostService postService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;

    // Nhan file anh tu UI
    // Dua file anh len python de trich xuat dac trung va tra ve id cua anh
    // tu danh sach ten anh lay ra id or name coi va tra ve id
//    @PostMapping(value = "/post/searchByImage",
//              consumes = {MediaType.APPLICATION_JSON_VALUE,
//                         MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> searchPostByImage(@RequestPart("fileSearchImg") MultipartFile fileSearchImg)
//    {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//            ByteArrayResource resource = new ByteArrayResource(fileSearchImg.getBytes()) {
//                @Override
//                public String getFilename() {
//                    return fileSearchImg.getOriginalFilename();
//                }
//            };
//            body.add("fileSearchImg", resource);
//            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
//            String url = "http://127.0.0.1:5000/ai/api/post/searchByImg";
//            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            List<String> stringList  = objectMapper.readValue(response.getBody(), new TypeReference<List<String>>(){});
//
//            List<Object> responeList = new ArrayList<>();
//            for ( String stringIdDocumentImage : stringList){
//                String[] parts = stringIdDocumentImage.split("_");
//                String typeString = parts[0]; // Lấy phần tử đầu tiên
//                if(typeString.equals("post")){
//                    Post tmp = postService.getPostById( Long.valueOf(stringIdDocumentImage.replaceAll("[^\\d]", "")));
//                    responeList.add(tmp);
//                }
//                else {
//                    Product tmp =  productService.getById(Long.valueOf(stringIdDocumentImage.replaceAll("[^\\d]", "")));
//                    responeList.add(tmp);
//                }
//            }
//            return ResponseEntity.ok().body(responeList);
//
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body(e);
//        }
//    }

    @PostMapping(value = "/post/searchByImage",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> searchPostByImage(@RequestPart("fileSearchImg") MultipartFile fileSearchImg)
    {
        try {

            List<Object> responeList = new ArrayList<>();
            List<Product> pL = productService.getAll() ;
            List<Post> postList = postService.getAll() ;
            responeList.addAll(pL);
            responeList.addAll(postList);

            return ResponseEntity.ok().body(responeList);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(e);
        }
    }
}
