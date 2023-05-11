package com.example.be_eric.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @NotBlank
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @NotBlank
    @NaturalId
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @NotBlank
    private String password;

    @Column(name = "gender",  columnDefinition = "BOOLEAN default false")
    private boolean gender = false;

    @Column(name = "isEnable", nullable = false, columnDefinition = "BOOLEAN default false")
    private boolean isEnable =false;

    private String number;
    private String avatar;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "User_Role",
            joinColumns = @JoinColumn(name = "user_id"),  //lien ket voi khoa chinh cua bang hien tai
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles =  new ArrayList<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true )
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Post> posts = new ArrayList<>();

    public User( String username,  String email,  String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(Long id, @NotBlank String username, @NotBlank String email, @NotBlank String password, List<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    // Thêm thuộc tính created_at và chú thích @CreationTimestamp
    @CreationTimestamp
    private LocalDateTime created_at;

    // Thêm thuộc tính updated_at và chú thích @UpdateTimestamp
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
