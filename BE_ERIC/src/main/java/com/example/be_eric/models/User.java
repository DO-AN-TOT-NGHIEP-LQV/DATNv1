package com.example.be_eric.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@ToString
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @NotBlank
    private String username;
    private String email;
    @NotBlank
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles =  new ArrayList<>();


    public User() {
    }

    public User(String username,  String password) {
        this.username = username;
        this.password = password;
    }

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(Long id, String name, String username, String email, String password, Collection<Role> roles) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

}
