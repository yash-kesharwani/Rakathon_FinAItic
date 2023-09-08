package com.rakathon.finaitic.dao;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class RegisteReq {
    @NotBlank
    private String name;
    @NotBlank
    private String gender;
    private Long dob;
    @Email
    private String email;
    private String password;
    @NotNull
    private Double income;
    @NotNull
    private Boolean metro;
}
