package com.example.be_eric.service;


import com.example.be_eric.DTO.MainDiscussionDTO;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DiscussionService {

    List<ProductMainDiscussion> getDiscussionsByProductId(Long id);
    Page<ProductMainDiscussion> getDiscussionsByProductId(Long id, Pageable pageable);

    List<MainDiscussionDTO> getDTOMainDiscussion(Long id);

    List<ProductMainDiscussion> getAllDiscussions();

    ProductMainDiscussion saveMainDiscussion (ProductMainDiscussion productMainDiscussion);
    ProductSubDiscussion save( ProductSubDiscussion productSubDiscussion);

    ProductMainDiscussion delete(ProductMainDiscussion productMainDiscussion);
    ProductSubDiscussion delete( ProductSubDiscussion productSubDiscussion);

}
