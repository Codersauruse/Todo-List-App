package com.example.backend.Controller;


import com.example.backend.DTO.Response.AppUserResponseDTO;
import com.example.backend.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<AppUserResponseDTO>> getAllUsers(){
         List<AppUserResponseDTO>  currentUsers = adminService.getAllUsers();
         if(!currentUsers.isEmpty()){
             return new ResponseEntity<>(currentUsers, HttpStatus.OK);
         }
         else {
             return ResponseEntity.noContent().build();
         }
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        String message = adminService.deleteUser(id);
        if("success".equals(message)){
            return new ResponseEntity<>("task successfully deleted",HttpStatus.OK);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
    }
}
