package com.example.be_eric.service;


import com.example.be_eric.DTO.MainDiscussionDTO;
import com.example.be_eric.models.Comment.ProductMainDiscussion;
import com.example.be_eric.models.Comment.ProductSubDiscussion;


import java.util.List;

public interface DiscussionService {

    List<MainDiscussionDTO> getDTOMainDiscussion(Long id);   //Get All Dis

    ProductMainDiscussion saveMainDiscussion (ProductMainDiscussion productMainDiscussion);
    ProductSubDiscussion saveSubDiscussion( ProductSubDiscussion productSubDiscussion);

    ProductMainDiscussion getMainDiscussionById (Long id);

    ProductMainDiscussion delete(ProductMainDiscussion productMainDiscussion);
    ProductSubDiscussion delete( ProductSubDiscussion productSubDiscussion);

}
