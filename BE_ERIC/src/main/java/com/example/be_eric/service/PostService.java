package com.example.be_eric.service;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {

    Post savePost( Post post);
    Post getPostById( Long id);
    void addImageToPost(Post post , Image image);
    void deleteAPost( Post post);

    List<Post> getAll();
    Page<Post> searchByText(String searchText, Pageable pageable);
    List<Post> searchByTextNotPageable(String searchText);


}
