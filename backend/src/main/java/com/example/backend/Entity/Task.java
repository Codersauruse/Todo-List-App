package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate; // Use LocalDate for date-only fields

@Table(name = "Task")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, name = "name") // Increased length
    private String name;

    @Column(nullable = false, length = 255, name = "description") // Increased length
    private String description;

    @Column(nullable = false, length = 50, name = "priority") // Adjusted length
    private String priority;

    @Column(nullable = false, name = "startDate") // No length needed for LocalDate
    private LocalDate startDate;

    @Column(nullable = false, name = "dueDate") // No length needed for LocalDate
    private LocalDate dueDate;

    @Column(name="iscomplete")
    private boolean iscomplete;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false) // This will create a foreign key to the User entity
    private appUser user;
}
