package com.example.be_eric.repository;

import com.example.be_eric.models.Post;
import com.example.be_eric.models.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


    Page<Post> findPostsByContentContainingOrTitleContaining(String content, String content2, Pageable pageable);
    List<Post> findPostsByContentContainingOrTitleContaining(String content, String content2);

}
