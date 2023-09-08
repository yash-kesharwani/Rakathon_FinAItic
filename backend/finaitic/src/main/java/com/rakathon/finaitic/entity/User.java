package com.rakathon.finaitic.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="user_details")
public class User {
    @Id
    private UUID id;
    private String name;
    private String gender;
    private Date dob;
    private String email;
    private String password;
    @Column(name= "avg_income")
    private Double income;
    private Boolean metro;

}
