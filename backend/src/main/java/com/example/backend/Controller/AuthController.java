package com.example.backend.Controller;


import com.example.backend.DTO.Response.LoginResponseDTO;
import com.example.backend.DTO.Response.registerResponseDTO;
import com.example.backend.Entity.appUser;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserService userService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody appUser AppUser){
        String message = userService.register(AppUser);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody appUser AppUser){
        String jwtToken = userService.verify(AppUser);
        LoginResponseDTO res = new LoginResponseDTO();
        res.setJwt(jwtToken);
        res.setMessage(AppUser.getUsername() +" succesfully logged in as a "+ AppUser.getRoles());
        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }



}
