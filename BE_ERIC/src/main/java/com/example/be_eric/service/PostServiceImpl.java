package com.example.be_eric.service;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl  implements  PostService{

    @Autowired
    private PostRepository postRepo;

    @Autowired ImageService imageService;


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
        image.setIsProductImage(false);
        post.getImages().add(image);
        postRepo.save(post);
    }

    @Override
    public void deleteAPost(Post post) {

         postRepo.delete(post);
    }

    @Override
    public List<Post> getAll() {
        return postRepo.findAll();
    }

    @Override
    public Page<Post> searchByText(String searchText, Pageable pageable) {
        return postRepo.findPostsByContentContainingOrTitleContaining(searchText, searchText, pageable);
    }

    @Override
    public List<Post> searchByTextNotPageable(String searchText) {
        return postRepo.findPostsByContentContainingOrTitleContaining(searchText, searchText);
    }


}
