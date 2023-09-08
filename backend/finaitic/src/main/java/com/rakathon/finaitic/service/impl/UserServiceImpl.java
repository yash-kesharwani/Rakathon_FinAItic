package com.rakathon.finaitic.service.impl;

import com.rakathon.finaitic.dao.RegisteReq;
import com.rakathon.finaitic.entity.User;
import com.rakathon.finaitic.repo.UserRepository;
import com.rakathon.finaitic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Override
    public boolean register(RegisteReq registeReq) {
        try {
            User user = new User();
            user.setId(UUID.randomUUID());
            user.setName(registeReq.getName());
            user.setEmail(registeReq.getEmail());
            user.setDob(new Date(registeReq.getDob()));
            user.setIncome(registeReq.getIncome());
            user.setGender(registeReq.getGender());
            user.setMetro(registeReq.getMetro());
            user.setPassword(Base64.getEncoder().encodeToString(registeReq.getPassword().getBytes()));
            user.setIsDataAvailable(false);
            userRepository.save(user);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            String pass = new String(Base64.getDecoder().decode(user.getPassword()));
            if(pass.equalsIgnoreCase(password)){
                user.setPassword(null);
                return user;
            }else return null;
        }else return null;
    }

    public boolean updateDataAvailability(String user){
        Optional<User> optionalUser = userRepository.findById(UUID.fromString(user));
        if(optionalUser.isPresent()){
            User user1 = optionalUser.get();
            user1.setIsDataAvailable(true);
            userRepository.save(user1);
            return true;
        } else return false;
    }
}
