package com.example.backend.Repo;


import com.example.backend.Entity.appUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<appUser,Long> {
    appUser findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}