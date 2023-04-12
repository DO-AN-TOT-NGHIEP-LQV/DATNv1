package com.example.be_eric;

import com.example.be_eric.models.Role;
import com.example.be_eric.models.User;
import com.example.be_eric.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class BeEricApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeEricApplication.class, args);
    }


    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    CommandLineRunner run(UserService userService){
        return args -> {
            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));
            userService.saveRole(new Role(null, "ROLE_MANAGER"));
            userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            userService.saveUser(new User(null, "1", "1", "1", "1", new ArrayList<>()));
            userService.saveUser(new User(null, "2", "2", "2", "2", new ArrayList<>()));
            userService.saveUser(new User(null, "3", "3", "3", "3", new ArrayList<>()));
            userService.saveUser(new User(null, "4", "4", "4", "4", new ArrayList<>()));

            userService.addRoleToUser("1", "ROLE_USER" );
            userService.addRoleToUser("1", "ROLE_ADMIN" );
            userService.addRoleToUser("1", "ROLE_SUPER_ADMIN" );
            userService.addRoleToUser("2", "ROLE_USER" );
            userService.addRoleToUser("2", "ROLE_MANAGER" );
            userService.addRoleToUser("4", "ROLE_ADMIN" );
        };
    }
}



