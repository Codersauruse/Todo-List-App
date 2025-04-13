package com.example.backend.Security.service;

import com.example.backend.Entity.UserPrincipal;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;
    @Override

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        appUser AppUser = userRepo.findByEmail(email);
        if (AppUser == null){
            throw  new UsernameNotFoundException("User not found");
        }
        else{
            UserPrincipal user = new UserPrincipal(AppUser) ;
            return user;
        }
    }
}
