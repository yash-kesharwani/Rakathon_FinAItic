package com.rakathon.finaitic.service;

import com.rakathon.finaitic.dao.RegisteReq;
import com.rakathon.finaitic.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    boolean register(RegisteReq user);

    User login(String username, String password);
}
