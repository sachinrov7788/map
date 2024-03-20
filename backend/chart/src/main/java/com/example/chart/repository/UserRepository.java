package com.example.chart.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.chart.model.User;

public interface UserRepository extends MongoRepository<User, String>{

}
