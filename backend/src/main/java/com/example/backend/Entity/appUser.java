package com.example.backend.Entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Table(name = "appUser")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class appUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 20,name = "username")

    private String username;


    @Column(nullable = false,unique = true,name = "email")

    private String email;


    @Column(nullable = false,length = 120,name = "password")
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole role;
}
