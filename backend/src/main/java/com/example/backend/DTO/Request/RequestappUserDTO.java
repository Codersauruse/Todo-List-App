package com.example.backend.DTO.Request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestappUserDTO {
    private String username;
    private String email;
    private String password;

}
