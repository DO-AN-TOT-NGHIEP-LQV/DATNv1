package com.example.be_eric.service;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl  implements  PostService{

    @Autowired
    private PostRepository postRepo;

    @Override
    public Post savePost(Post post) {
        return postRepo.save(post) ;
    }

    @Override
    public Post getPostById(Long id) {
        return postRepo.findById( id).orElse(null);
    }

    @Override
    public void addImageToPost(Post post, Image image) {
        post.getPostImages().add(image);
        postRepo.save(post);
    }
}
