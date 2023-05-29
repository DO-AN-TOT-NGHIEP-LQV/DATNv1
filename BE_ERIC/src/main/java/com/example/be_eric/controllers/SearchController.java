package com.example.be_eric.controllers;

import com.example.be_eric.models.Post;
import com.example.be_eric.models.Product.Product;
import com.example.be_eric.service.PostService;
import com.example.be_eric.service.ProductService;
import com.example.be_eric.service.ShopService;
import com.example.be_eric.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
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
//    @PostMapping(value = "/search/searchByImage",
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
//
    @PostMapping(value = "/search/searchByImage",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> searchPostByImage(@RequestPart("fileSearchImg") MultipartFile fileSearchImg) {
        try {

            List<Object> responeList = new ArrayList<>();
            List<Product> pL = productService.getAll();
            List<Post> postList = postService.getAll();
            responeList.addAll(pL);
            responeList.addAll(postList);

            return ResponseEntity.ok().body(responeList);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping(value = "/search/posts/SearchByText")
    public ResponseEntity searchPostByText(@RequestParam("searchText") String searchText, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Post> postListPage = postService.searchByText(searchText, pageable);
        List<Post> postList = postListPage.getContent();
        return ResponseEntity.ok().body(postList);
    }


    @GetMapping(value = "/search/products/SearchByText")
    public ResponseEntity searchProductByText(@RequestParam("searchText") String searchText, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> productsListPage = productService.searchByText(searchText, pageable);
        List<Product> productsList = productsListPage.getContent();
        return ResponseEntity.ok().body(productsList);

    }

    @GetMapping(value = "/search/all/SearchByText")
    public ResponseEntity searchAllByText(@RequestParam("searchText") String searchText, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> productsListPage = productService.searchByText(searchText, pageable);
        List<Product> productsList = productsListPage.getContent();

        Page<Post> postListPage = postService.searchByText(searchText, pageable);
        List<Post> postList = postListPage.getContent();

        List<Object> responeList = new ArrayList<>();
        responeList.addAll(productsList);
        responeList.addAll(postList);

        return ResponseEntity.ok().body(responeList);
    }


//    @GetMapping(value = "/search/GetAllShop")
//    public ResponseEntity searchGetAllShop() {
//        Pageable pageable = PageRequest.of(page, 10);
//        Page<Product> productsListPage = productService.searchByText(searchText, pageable);
//        List<Product> productsList = productsListPage.getContent();
//
//        Page<Post> postListPage = postService.searchByText(searchText, pageable);
//        List<Post> postList = postListPage.getContent();
//
//        List<Object> responeList = new ArrayList<>();
//        responeList.addAll(productsList);
//        responeList.addAll(postList);
//
//        return ResponseEntity.ok().body(responeList);
//    }
}