package com.example.backend.Controller;


import com.example.backend.DTO.Response.TaskResponseDTO;
import com.example.backend.Entity.Task;
import com.example.backend.Repo.TaskRepo;
import com.example.backend.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/create-task")
    public ResponseEntity<String> createTask(@RequestBody Task task){
        String result = taskService.createTask(task);
        if ("success".equals(result)) {
            return new ResponseEntity<>("Task created successfully", HttpStatus.CREATED); // HTTP 201 Created
        } else if ("alreadyExists".equals(result)) {
            return new ResponseEntity<>("Task already exists", HttpStatus.BAD_REQUEST); // HTTP 400 Bad Request
        } else {
            return new ResponseEntity<>("Error creating task", HttpStatus.INTERNAL_SERVER_ERROR); // HTTP 500 Internal Server Error
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/getAllTasks")
    public ResponseEntity<List<TaskResponseDTO>>getAllTasks(){
        List<TaskResponseDTO> myTasks = taskService.getAllTasks();
        if(myTasks.isEmpty()){
         return ResponseEntity.noContent().build();
        }
        else{
            return new ResponseEntity<>(myTasks,HttpStatus.OK);
    }

}
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/getDailyTasks")
    public ResponseEntity<List<TaskResponseDTO>>getDailyTasks(){
        List<TaskResponseDTO> myTasks = taskService.getDailyTasks();
        if(myTasks.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        else{
            return new ResponseEntity<>(myTasks,HttpStatus.OK);
        }

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        String message = taskService.deleteTask(id);
        if("success".equals(message)){
            return new ResponseEntity<>("task successfully deleted",HttpStatus.OK);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping ("/update/{id}")
    public ResponseEntity<String> updateTaskPartial(@PathVariable Long id, @RequestBody Map<String ,Object> Updates){
        String message = taskService.updateTaskPartial(id,Updates);
        if("success".equals(message)){
            return new ResponseEntity<>("task successfully updated",HttpStatus.OK);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
    }
}
