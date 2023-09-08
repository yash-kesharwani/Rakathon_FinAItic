package com.rakathon.finaitic.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="categories")
public class Category {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private int id;
    private List<String> keywords;
    private String details;
    private String category;
}
