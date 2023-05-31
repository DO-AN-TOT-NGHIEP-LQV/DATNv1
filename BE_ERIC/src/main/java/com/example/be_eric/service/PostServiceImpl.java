package com.example.be_eric.service;


import com.example.be_eric.models.Image;
import com.example.be_eric.models.Post;
import com.example.be_eric.repository.PostRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
    @Transactional
    public void addImageToPost(Post post, Image image) {

        Optional<Post> optionalPost = postRepo.findById(post.getId());
        if (optionalPost.isPresent()) {
            Post newpost = optionalPost.get();
            image.setIsProductImage(false);
            newpost.getImages().add(image);
            postRepo.save(newpost);
        }

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
