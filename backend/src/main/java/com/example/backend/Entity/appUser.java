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

    @Column(nullable = false,unique = true,length = 20,name = "username")

    private String username;


    @Column(nullable = false,unique = true,length = 50,name = "email")

    private String email;


    @Column(nullable = false,length = 120,name = "password")
    private String password;

    @OneToMany(mappedBy = "user") // "user" is the field name in Task entity
    private Set<Task> tasks = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}
