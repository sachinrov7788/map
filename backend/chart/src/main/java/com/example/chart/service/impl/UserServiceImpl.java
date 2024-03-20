package com.example.chart.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chart.model.User;
import com.example.chart.repository.UserRepository;
import com.example.chart.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> user= userRepository.findAll();
        user.forEach(val->{
            System.out.println(val);
        });
        return user;
    }
}
