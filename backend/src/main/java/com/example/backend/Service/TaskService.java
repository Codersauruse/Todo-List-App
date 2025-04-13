package com.example.backend.Service;


import com.example.backend.DTO.Request.RequestTaskDTO;
import com.example.backend.DTO.Response.TaskResponseDTO;
import com.example.backend.Entity.Task;
import com.example.backend.Entity.UserPrincipal;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.TaskRepo;
import com.example.backend.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;


    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepo userRepo;
    @Transactional
    public String createTask(RequestTaskDTO task) {



        Optional<appUser> user = userRepo.findById(task.getId());
        if(user.isEmpty()){
            throw new RuntimeException("user is not found");
        }
        System.out.println(user.get());

        // Set the user for the task
       Task newtask = new Task();
        System.out.println(newtask);
        newtask.setName(task.getName());
        newtask.setDescription(task.getDescription());
        newtask.setPriority(task.getPriority());
        newtask.setStartDate(task.getStartDate());
        newtask.setDueDate(task.getDueDate());
        newtask.setIscomplete(false);
        newtask.setUser(user.get());

        System.out.println(newtask);
        // Check if the task already exists by name
//        if (!taskRepo.existsByName(newtask.getName())) {
            taskRepo.save(newtask);
            return "success"; // Task created successfully
//        }
//        return "alreadyExists"; // Task with the same name already exists
    }


    public List<Task> getAllTasks(long id) {
        Optional<appUser> AppUser = userRepo.findById(id);
        if(AppUser.isEmpty()){
            throw new RuntimeException("user is not registerd");
        }

            List<Task> myTasks = taskRepo.findAllByUser(AppUser.get());

   return  myTasks;
    }

    public List<TaskResponseDTO> getDailyTasks(long id) {
        Optional<appUser> user = userRepo.findById(id);
        if(user.isEmpty()){
            throw new RuntimeException("user is not registered");
        }
        List<TaskResponseDTO> mylist = new ArrayList<>();
        LocalDate today = LocalDate.now();
        if(taskRepo.existsByUser(user.get())){
            List<Task> myTasks = taskRepo.findByUser_IdAndIscompleteFalse(user.get().getId());
            if(!myTasks.isEmpty()){
                for (Task t:myTasks
                ) {
                    if(t.getStartDate().isEqual(today) || (today.isAfter(t.getStartDate()) && today.isBefore(t.getDueDate()) ) || t.getDueDate().isEqual(today))
                    mylist.add(new TaskResponseDTO(t.getId(),t.getName(),t.getDescription(),t.getPriority(),t.getStartDate(),t.getDueDate(),t.isIscomplete()));

                }
            }

        }
        return  mylist;
    }

    @Transactional
    public String deleteTask(Long id) {

        Optional<Task> task = taskRepo.findById(id);

        if (task.isPresent()) {
            // Delete the task if it exists
            taskRepo.delete(task.get());  // This will remove the task from the repository
            return "success";
        } else {
            return "fail";  // Return fail if the task does not exist
        }
    }

    public String updateTaskPartial(Long id, Map<String, Object> updates) {

        Optional<Task> optionalTask = taskRepo.findById(id);

        if(optionalTask.isPresent()){
            Task task = optionalTask.get();

            // Apply updates to the task
            updates.forEach((key, value) -> {
                System.out.println(key);


                           switch (key) {

                               case "name" -> task.setName((String) value);
                               case "description" -> task.setDescription((String) value);
                               case "priority" -> task.setPriority((String) value);
                               case "startDate" -> task.setStartDate(LocalDate.parse((String) value));
                               case "dueDate" -> task.setDueDate(LocalDate.parse((String) value));
                               default -> throw new IllegalArgumentException("Invalid field: " + key);
                           }


        });
            taskRepo.save(task);
            return "success";

    }
        return "fail";
}

    public String updateTaskstatus(Long id) {
        Optional<Task> task = taskRepo.findById(id);
        if(task.isEmpty()){
            throw new RuntimeException("there is no task");
        }
        task.get().setIscomplete(true);
        taskRepo.save(task.get());
        return "success";
    }
}
