package com.rakathon.finaitic.service;

import com.rakathon.finaitic.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    boolean generateFile(String user);
}
