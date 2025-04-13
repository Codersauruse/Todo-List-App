package com.example.backend.Service;


import com.example.backend.DTO.Request.RequestappUserDTO;
import com.example.backend.DTO.Request.RequestappUserLoginDTO;
import com.example.backend.DTO.Response.LoginResponseDTO;
import com.example.backend.Entity.ERole;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Security.jwt.JWTService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    @Autowired
    private ModelMapper modelMapper;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String register(RequestappUserDTO user) {

        user.setPassword(encoder.encode(user.getPassword()));
        if(repo.existsByUsername(user.getUsername())){
            return "username already taken";
        }
        if(repo.existsByEmail(user.getEmail())){
            return "email already exists";
        }
        appUser Appuser = modelMapper.map(user,appUser.class);
        // Check if the username is "admin" (case insensitive)
        if ("admin".equalsIgnoreCase(user.getUsername())) {
            Appuser.setRole(ERole.ROLE_ADMIN);
        }
        else {
            Appuser.setRole(ERole.ROLE_USER);
        }

        repo.save(Appuser);
        return Appuser.getUsername() + " is successfully registered ";

    }

    public String verify(RequestappUserLoginDTO user) {

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            appUser dbUser = repo.findByEmail(user.getEmail());
            String role = dbUser.getRole().toString();
            List<String> roleNames = new ArrayList<>();
            roleNames.add(role);
            return jwtService.generateToken(user.getEmail(),roleNames);
        } else {
            throw new BadCredentialsException("please check the email and password again");
        }
    }

    public LoginResponseDTO login(String jwtToken, String email) {
        appUser dbUser = repo.findByEmail(email);
        if (dbUser == null){
            throw new RuntimeException("user is not registered");
        }
        LoginResponseDTO login = new LoginResponseDTO(dbUser.getId(), dbUser.getEmail(), dbUser.getUsername(),jwtToken);
        return login;

    }
}