package com.example.backend.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestTaskDTO {
    private long id;
    private String name;
    private String description;
    private String priority;
    private LocalDate startDate;
    private LocalDate dueDate;
    private boolean iscomplete;
}
