package com.example.backend.DTO.Response;

import com.example.backend.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponseDTO {
    private String jwt;
    private String message;

    public void setJwt(String jwt){
        this.jwt = jwt;
    }
    public void setMessage(String message){
        this.message = message;
    }

}

