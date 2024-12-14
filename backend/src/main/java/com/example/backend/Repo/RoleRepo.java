package com.example.backend.Repo;


import com.example.backend.Entity.ERole;
import com.example.backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface RoleRepo extends JpaRepository<Role,Integer> {
    Role findByName(ERole roleUser);
}
