package com.example.backend.Service;


import com.example.backend.DTO.Response.AppUserResponseDTO;
import com.example.backend.Entity.appUser;
import com.example.backend.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepo userRepo;
    public  List<AppUserResponseDTO> getAllUsers() {
        List<appUser> dbUsers = userRepo.findAllByUsernameNotLike("%admin%");
        List<AppUserResponseDTO> appUsers = new ArrayList<>();
        if(!dbUsers.isEmpty()){
            for (appUser a:dbUsers
                 ) {
                appUsers.add(new AppUserResponseDTO(a.getId(),a.getUsername(),a.getEmail()));
            }
        }
        return appUsers;

    }

    public String deleteUser(Long id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return "User with ID " + id + " has been deleted successfully.";
        } else {
            return "User with ID " + id + " does not exist.";
        }
    }
}
