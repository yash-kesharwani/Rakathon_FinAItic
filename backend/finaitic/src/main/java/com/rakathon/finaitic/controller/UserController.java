package com.rakathon.finaitic.controller;

import com.rakathon.finaitic.dao.RegisteReq;
import com.rakathon.finaitic.entity.User;
import com.rakathon.finaitic.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody @Valid RegisteReq registeReq){
        boolean status = userService.register(registeReq);
        if(status)
            return ResponseEntity.ok().body("Success");
        else
            return ResponseEntity.internalServerError().body("Failed");
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password){
        User user = userService.login(username, password);
        if(user != null)
            return ResponseEntity.ok().body(user);
        else
            return ResponseEntity.badRequest().body("Login Failed");
    }
}
