package com.example.backend.Service;


import com.example.backend.DTO.Response.TaskResponseDTO;
import com.example.backend.Entity.Task;
import com.example.backend.Entity.UserPrincipal;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.TaskRepo;
import com.example.backend.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;
    public String createTask(Task task) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Here, you would fetch the appUser based on the username (or userId) from the database
        appUser user = userRepo.findByUsername(principal.getUsername());

        // Set the user for the task
        task.setUser(user);

        // Check if the task already exists by name
        if (!taskRepo.existsByName(task.getName())) {
            taskRepo.save(task);
            return "success"; // Task created successfully
        }
        return "alreadyExists"; // Task with the same name already exists
    }


    public List<TaskResponseDTO> getAllTasks() {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Here, you would fetch the appUser based on the username (or userId) from the database
        appUser user = userRepo.findByUsername(principal.getUsername());
        List<TaskResponseDTO> mylist = new ArrayList<>();
        if(taskRepo.existsByUser_Id(user.getId())){
            List<Task> myTasks = taskRepo.findByUser_Id(user.getId());
            if(!myTasks.isEmpty()){
                for (Task t:myTasks
                     ) {
                    mylist.add(new TaskResponseDTO(t.getId(),t.getName(),t.getDescription(),t.getPriority(),t.getStartDate(),t.getDueDate(),t.isIscomplete()));

                }
            }

        }
   return  mylist;
    }

    public List<TaskResponseDTO> getDailyTasks() {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Here, you would fetch the appUser based on the username (or userId) from the database
        appUser user = userRepo.findByUsername(principal.getUsername());
        List<TaskResponseDTO> mylist = new ArrayList<>();
        LocalDate today = LocalDate.now();
        if(taskRepo.existsByUser_Id(user.getId())){
            List<Task> myTasks = taskRepo.findByUser_IdAndIscompleteFalse(user.getId());
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
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Here, you would fetch the appUser based on the username (or userId) from the database
        appUser user = userRepo.findByUsername(principal.getUsername());
        Optional<Task> task = taskRepo.findByIdAndUser_Id(id, user.getId());

        if (task.isPresent()) {
            // Delete the task if it exists
            taskRepo.delete(task.get());  // This will remove the task from the repository
            return "success";
        } else {
            return "fail";  // Return fail if the task does not exist
        }
    }

    public String updateTaskPartial(Long id, Map<String, Object> updates) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Here, you would fetch the appUser based on the username (or userId) from the database
        appUser user = userRepo.findByUsername(principal.getUsername());
        Optional<Task> optionalTask = taskRepo.findByIdAndUser_Id(id, user.getId());

        if(optionalTask.isPresent()){
            Task task = optionalTask.get();

            // Apply updates to the task
            updates.forEach((key, value) -> {
                        switch (key) {
                            case "name" -> task.setName((String) value);
                            case "description" -> task.setDescription((String) value);
                            case "priority" -> task.setPriority((String) value);
                            case "startDate" -> task.setStartDate(LocalDate.parse((String) value));
                            case "dueDate" -> task.setDueDate(LocalDate.parse((String) value));
                            case "isComplete" -> task.setIscomplete((Boolean) value);
                            default -> throw new IllegalArgumentException("Invalid field: " + key);
                        }

        });
            taskRepo.save(task);
            return "success";

    }
        return "fail";
}
}
