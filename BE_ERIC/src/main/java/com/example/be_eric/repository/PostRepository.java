package com.example.be_eric.repository;

import com.example.be_eric.models.Post;
import com.example.be_eric.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
