package com.example.backend.Service;


import com.example.backend.Entity.ERole;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.RoleRepo;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Security.jwt.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    @Autowired
    private RoleRepo roleRepo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String register(appUser user) {

        user.setPassword(encoder.encode(user.getPassword()));
        if(repo.existsByUsername(user.getUsername())){
            return "username already taken";
        }
        if(repo.existsByEmail(user.getEmail())){
            return "email already exists";
        }
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName(ERole.ROLE_USER);

        // Check if the username is "admin" (case insensitive)
        if ("admin".equalsIgnoreCase(user.getUsername())) {
            Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN);
            roles.add(adminRole);
        }

        roles.add(userRole); // Add the user role for all users
        user.setRoles(roles);

        // Save the user
        repo.save(user);
        return user.getUsername() + " is successfully registered " + user.getRoles().toString();

    }

    public String verify(appUser user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            appUser dbUser = repo.findByUsername(user.getUsername());
            List<String> roleNames = dbUser.getRoles().stream()
                    .map(role -> role.toString()) // Convert enum to string
                    .toList();
            for (String role: roleNames
                 ) {
                System.out.println(role);
            }
            return jwtService.generateToken(user.getUsername(),roleNames);
        } else {
            throw new BadCredentialsException("please check the username and password again");
        }
    }
}