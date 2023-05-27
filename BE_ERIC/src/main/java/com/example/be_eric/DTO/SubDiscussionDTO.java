package com.example.be_eric.DTO;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubDiscussionDTO {
    private Long subId;
    private String subContent;
    private String subUsername;
    private Long subUserId;
    private String subUserAvatar;
    private LocalDateTime subUpdateAt;


    public SubDiscussionDTO(Long id, String content, String username, Long userId, String userLogo, LocalDateTime updateAt) {
        this.subId = id;
        this.subContent = content;
        this.subUsername = username;
        this.subUserId = userId;
        this.subUserAvatar = userLogo;
        this.subUpdateAt = updateAt;
    }
}
