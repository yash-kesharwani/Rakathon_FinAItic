package com.rakathon.finaitic.service;

import com.rakathon.finaitic.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    String fetchCategory(String details, List<Category> categories);
}
