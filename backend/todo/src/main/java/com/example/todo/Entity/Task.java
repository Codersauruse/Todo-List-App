package com.example.todo.Entity;


import com.example.todo.Utils.Role;
import jakarta.persistence.*;

@Entity
@Table(name="Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Task_id;
    @Column(name="Taskname", length=50, nullable=false, unique=false)
    private String Taskname;
    @Column(name="Description", length=100, nullable=false, unique=false)
    private String Description;

    @ManyToOne
    @JoinColumn(name="userId")
    private AppUser appUser;

}