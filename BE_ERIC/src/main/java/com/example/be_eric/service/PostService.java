package com.example.be_eric.service;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;

public interface PostService {

    Post savePost( Post post);
    Post getPostById( Long id);
    void addImageToPost(Post post , Image image);

}
