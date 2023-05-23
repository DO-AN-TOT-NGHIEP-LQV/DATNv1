package com.example.be_eric.service;

import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.ultils.Exception.UploadImageException;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;

import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

@Service
public class FirebaseFileService {
    private Storage storage ;

    @Autowired
    private PostService postService;

    @Autowired
    private  ImageService imageService;

    @Autowired
    private Firestore firestore;

    @EventListener
    public void init(ApplicationReadyEvent event) {
        System.out.println("33333333333333");
        try {
            FileInputStream serviceAccounts =
                new FileInputStream("src/main/resources/serviceFirebaseKey.json");

            storage = StorageOptions.newBuilder().
                    setCredentials(GoogleCredentials.fromStream(serviceAccounts))
                    .setProjectId("datnv1-34493")
                    .build().getService();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Transactional(rollbackOn = UploadImageException.class)
    public String uploadImage_saveVector(MultipartFile fileImage, Post post) throws  UploadImageException {

        try {

            postService.savePost(post);

            String imageName = "u_" + post.getUser().getId() + "_p_" + post.getId() + "_name_" + generateFileName(fileImage.getOriginalFilename());
            String folderName = "ImageTest";
            String filePath = folderName + "/" + imageName;
            System.out.println(imageName);
            System.out.println("555555555555");

            BlobId blobId = BlobId.of("datnv1-34493.appspot.com", filePath);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(fileImage.getContentType())
                    .build();
            storage.create(blobInfo, fileImage.getBytes());

            String fileUrl = "https://firebasestorage.googleapis.com/v0/b/datnv1-34493.appspot.com/o/" + URLEncoder.encode(filePath, "UTF-8") + "?alt=media";

            Image image = imageService.saveImage(new Image(null, imageName, fileUrl, false));
            postService.addImageToPost(post, image);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            ByteArrayResource resource = new ByteArrayResource(fileImage.getBytes()) {
                @Override
                public String getFilename() {
                    return fileImage.getOriginalFilename();
                }
            };
            body.add("fileImage", resource);
            body.add("post_id", post.getId());
            System.out.println("66666666666666666");

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            String url = "http://127.0.0.1:5000/ai/api/post/addNewImg";
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            HttpStatus statusCode = response.getStatusCode();
            int statusCodeValue = statusCode.value();

            if (statusCodeValue == 500) {   // thi luu anh do vao DB. va upload anh le
                boolean deleted = storage.delete(blobId);
                throw new UploadImageException();
            }
            return fileUrl;

        } catch (Exception e) {
            System.out.println(e);
            throw new UploadImageException();
        }
    }

    @Transactional
    public  boolean deletePost_removeVector(Post post) throws Exception {

        try {
            WriteBatch batch = firestore.batch();
            for ( int i = 0 ; i < 10 ; i++){

                DocumentReference docRef = firestore.collection("Image_Feature_Vector").document("post_" +  post.getId() + "_" + i);
                batch.delete(docRef);
                System.out.println("Xoa anh thanh cong anh " + i);
            }

            List<Image> images = post.getImages();
            String folderName = "ImageTest";

            for (Image image : images) {
                String filePath = folderName + "/" + image.getNo();
                BlobId blobId = BlobId.of("datnv1-34493.appspot.com", filePath);
                boolean deleted = storage.delete(blobId);
                if (deleted) {
                    System.out.println("File đã được xóa thành công");
                    imageService.deleteImage(image);
                } else {
                    System.out.println("Không thể xóa file");
                    throw new  Exception("Lối trong quá trình xóa ảnh");
                }
            };

            postService.deleteAPost(post);
            ApiFuture<List<WriteResult>> future = batch.commit();
            future.get();
            return  true;
        }catch (Exception e){
            throw e;
        }

    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "." + getExtension(originalFileName);
    }

    private String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }


}
