package com.example.backend.DTO.Response;

import com.example.backend.Entity.appUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskResponseDTO {


    private Long id;
    private String name;
    private String description;
    private String priority;
    private LocalDate startDate;
    private LocalDate dueDate;
    private boolean iscomplete;

}
