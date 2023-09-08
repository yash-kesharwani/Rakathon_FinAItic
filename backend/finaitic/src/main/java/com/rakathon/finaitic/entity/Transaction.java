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
@Table(name="transactions")
public class Transaction {
    @Id
    private UUID id;
    @Column(name = "user_id")
    private int userId;
    private Date txdate;
    private String details;
    private Double withdrawal;
    private Double deposit;
    private Double balance;
    private String category;
}
