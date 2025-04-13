package com.example.backend.Repo;


import com.example.backend.Entity.Task;
import com.example.backend.Entity.appUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface TaskRepo extends JpaRepository<Task,Long> {
    boolean existsByName(String name);



    boolean existsByUser_Id(Long id);

    List<Task>findByUser_Id(Long id);


    List<Task> findByUser_IdAndIscompleteFalse(Long id);



    void deleteTaskByIdAndUser_Id(Long id, Long id1);


    Optional<Task> findByIdAndUser_Id(Long id, Long id1);

    boolean existsByUser(appUser appUser);

    List<Task> findAllByUser(appUser appUser);
}
