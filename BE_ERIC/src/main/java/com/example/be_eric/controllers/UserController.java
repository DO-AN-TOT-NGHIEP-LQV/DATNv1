package com.example.be_eric.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be_eric.models.Role;
import com.example.be_eric.models.User;
import com.example.be_eric.service.UserService;
import com.example.be_eric.ultils.Exception.DuplicateValueException;
import com.example.be_eric.ultils.Messenger.ErrorResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @Autowired
    private  UserService userService;



    final
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/user/getDetail")
    public ResponseEntity<?> getPosts (HttpServletRequest request, HttpServletResponse response) {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if( authorizationHeader != null && authorizationHeader.startsWith("Bearer ") ){
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();   // dung email de dat lam user name
                User user = userService.getUserByEmail(username);

                return ResponseEntity.ok().body(user);

            }catch (Exception exception){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(exception.getMessage()));
            }
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Lỗi xác thực"));
        }


    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> saveUser(@RequestBody UserForm user) {
        try {

            User newUser = new User(user.getUsername(), user.getEmail(), user.getPassword());


            userService.saveUser(newUser);
            return ResponseEntity.ok().build();
        } catch (DuplicateValueException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/user/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody UserForm userForm, HttpServletRequest request) {
        try {

            String authorizationHeader = request.getHeader(AUTHORIZATION);

            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);
            if( user == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Người dùng không tồn tại"));


            boolean isMatch = passwordEncoder.matches( userForm.getCurrentPassword(), user.getPassword());
                System.out.println(isMatch);

            if(isMatch == false)
//                System.out.println("khong trung");
                return ResponseEntity.badRequest().body(new ErrorResponse("Sai mật khẩu"));

            user.setPassword(userForm.getNewPassword());

            if(userService.changePassword(user))
            return ResponseEntity.ok().build();
            else
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Có lỗi sảy ra trong tiến trình"));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }


//    @PostMapping("/role/save")
//    public ResponseEntity<Role> saveRole(@RequestBody Role role){
//        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
//        return ResponseEntity.created(uri).body(userService.saveRole(role));
//    }
//
//    @PostMapping("/role/addtouser")
//    public ResponseEntity<?> addRoleToUser( @RequestBody RoleToUserForm form){
//        userService.addRoleToUser(form.getUsername(), form.getRoleName());
//        return ResponseEntity.ok().build();
//    }

//    @GetMapping("/token/refresh")
//    public void refreshToken( HttpServletRequest request, HttpServletResponse response)  {
//
//        String authorizationHeader = request.getHeader(AUTHORIZATION);
//        if( authorizationHeader != null && authorizationHeader.startsWith("Bearer ") ){
//            try {
//                String refresh_token = authorizationHeader.substring("Bearer ".length());
//                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
//                JWTVerifier verifier = JWT.require(algorithm).build();
//                DecodedJWT decodedJWT = verifier.verify(refresh_token);
//                String username = decodedJWT.getSubject();
//                User user = userService.getUserByEmail(username);
//
//                String access_token = JWT.create()
//                        .withSubject(user.getEmail())
//                        .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
//                        .withIssuer(request.getRequestURL().toString())
//                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
//                        .sign(algorithm);
//
//                Map<String,String> tokens = new HashMap<>();
//                tokens.put("access_token",access_token);
//                tokens.put("refresh_token",refresh_token);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
//                System.out.println("khong loi");
//
//            }catch (Exception exception){
//                System.out.println(exception.getMessage());
//
//                response.setHeader("error", exception.getMessage());
//                response.setStatus(FORBIDDEN.value());
//                //response.sendError(FORBIDDEN.value()); //403
//                Map<String,String> error = new HashMap<>();
//                error.put("error_message", "Refresh token da het han, hay danh nhap la");
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream(), error);
//            }
//        }else {
//            throw new RuntimeException("Refresh token is missing");
//        }
//    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Token đã hết hạn"));
            }

            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();
            User user = userService.getUserByEmail(username);

            String access_token = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 2 * 60 * 60 * 1000))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                    .sign(algorithm);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);

            return ResponseEntity.ok(tokens);
        } catch (Exception exception) {
            System.out.println( exception.getMessage());

            Map<String, String> error = new HashMap<>();
            error.put("error_message", "Refresh token đã hết hạn, hãy đăng nhập lại");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}

@Data
class UserForm {
    private String username;
    private String email;
    private String password;
    private String currentPassword;
    private String newPassword;

}

