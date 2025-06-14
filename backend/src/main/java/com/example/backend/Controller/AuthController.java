package com.example.backend.Controller;


import com.example.backend.DTO.Request.RequestappUserDTO;
import com.example.backend.DTO.Request.RequestappUserLoginDTO;
import com.example.backend.DTO.Response.LoginResponseDTO;
import com.example.backend.DTO.Response.registerResponseDTO;
import com.example.backend.Entity.appUser;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000","http://56.228.8.221"})
public class AuthController {
    @Autowired
    UserService userService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RequestappUserDTO AppUser){
        String message = userService.register(AppUser);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody RequestappUserLoginDTO AppUser){
        String jwtToken = userService.verify(AppUser);
        LoginResponseDTO res = userService.login(jwtToken,AppUser.getEmail());
        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }



}
