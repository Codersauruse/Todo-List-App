package com.example.backend.Entity;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    private appUser Appuser;
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(appUser Appuser){
        this.Appuser = Appuser;
    }

    private void setAuthorities(appUser Appuser) {
        this.authorities = Appuser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())) // Convert each role to SimpleGrantedAuthority
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        setAuthorities(Appuser);
        return authorities;
    }

    @Override
    public String getPassword() {
        return Appuser.getPassword();
    }

    @Override
    public String getUsername() {
        return Appuser.getUsername();
    }
}