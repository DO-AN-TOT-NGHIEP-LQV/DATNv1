package com.example.be_eric.controllers;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.models.User;
import com.example.be_eric.service.FirebaseFileService;
import com.example.be_eric.service.PostService;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;
import com.example.be_eric.ultils.Messenger.UploadImageResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Controller
public class ResourceController {

    @Autowired
    private FirebaseFileService firebaseFileService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    // Luu bai post vao DB
    // Luu hinh anh len fire storage
    // Goi api flask de luu vector feature len fire store
    @PostMapping(value = "/api/post/create", name = "POST",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                        MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity create(@RequestPart("post") String post , @RequestPart("fileImage") MultipartFile fileImage)
    {
        Post newPost = new Post();
        try {

            System.out.println("tai 1");
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> postMap = objectMapper.readValue(post, new TypeReference<Map<String, Object>>() {});

//            ObjectMapper objectMapper = new ObjectMapper();
//            newPost = objectMapper.readValue(post, Post.class);
            newPost.setContent(  (String) postMap.get("content") );
            newPost.setTitle(  (String) postMap.get("title") );
            System.out.println("tai 2");

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User u = userService.getUserByEmail( authentication.getName());

            newPost.setUser( u );

            System.out.println(newPost.getUser().getEmail());
            String fileName = firebaseFileService.uploadImage_saveVector(fileImage, newPost  );
            return ResponseEntity.ok().build();

//            // Goi api flask save vector fetrure
//            RestTemplate restTemplate = new RestTemplate();
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//            ByteArrayResource resource = new ByteArrayResource(fileImage.getBytes()) {
//                @Override
//                public String getFilename() {
//                    return fileImage.getOriginalFilename();
//                }
//            };
//            body.add("fileImage", resource);
//            body.add("post_id", newPost.getId());
//
//            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
//            String url = "http://127.0.0.1:5000/ai/api/post/addNewImg";
//            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
//            HttpStatus statusCode = response.getStatusCode();
//            int statusCodeValue = statusCode.value();
//
//            if( statusCodeValue == 200 ){   // thi luu anh do vao DB. va upload anh le
//                return ResponseEntity.ok().build();
////                String fileName = firebaseFileService.uploadImage(fileImage, newPost  );
//            }
//            else  throw  new UploadImageExcepton( );

            // upload file anh
        }
        catch (UploadImageException e){
            return ResponseEntity.badRequest()
                    .body(new UploadImageResponse("Upload anh khong thanh cong"));
        }
        catch (Exception e) {
            // Neu ma co loi thi phai xoa het dong trantraction nay
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // De xoa 1 post can
    // Tao 1 transtract tion
    // Xoa san pham
    // Xoa nhung id
    // Xoa nhung id hinh anh da train trong firebase
    // Xoa nhung id hinh anh
    @PostMapping(value = "/api/post/delete")
    public ResponseEntity delete(@RequestParam("IdDelete") Long IdDelete)
    {
        Post post = postService.getPostById(IdDelete);

        try {

            if (post == null){
                throw  new Exception( "Id sản phẩm không còn tồn tại");
            }

            firebaseFileService.deletePost_removeVector(post);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
}
