package com.example.be_eric.models;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "user_id", updatable = false)
    @JsonProperty("user_id")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinTable(
            name = "post_images",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private List<Image> postImages =  new ArrayList<>();

    public Post(Long id, String content, String title, User user) {
        this.id = id;
        this.content = content;
        this.title = title;
        this.user = user;
    }

    public Post(Long id, String content, String title) {
        this.id = id;
        this.content = content;
        this.title = title;
    }

    public Post( String content, String title) {

        this.content = content;
        this.title = title;
    }
}