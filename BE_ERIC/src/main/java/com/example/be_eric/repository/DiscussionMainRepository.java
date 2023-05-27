package com.example.be_eric.repository;


import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DiscussionMainRepository extends JpaRepository<ProductMainDiscussion, Long> {


//    Page<Post> findPostsByContentContainingOrTitleContaining(String content, String content2, Pageable pageable);

//       Page<ProductMainDiscussion> findProductMainDiscussionsByProduct(Long id, Pageable pageable);
//       List<ProductMainDiscussion> findProductMainDiscussionsByProduct(Long id);


//
@Query("SELECT mc.id, mc.mainContent, u.lastName, u.id, u.avatar, sc.id, sc.subContent, subUser.id, subUser.lastName, subUser.avatar, mc.updated_at, sc.created_at  " +
        "FROM ProductMainDiscussion mc " +
        "JOIN mc.user u " +
        "LEFT JOIN  mc.subDiscussions sc " +
        "LEFT JOIN sc.user subUser " +
        "WHERE mc.product.id = :productId")
       List<Object[]> findProductMainDiscussionsByProduct(@Param("productId") Long productId);
}



