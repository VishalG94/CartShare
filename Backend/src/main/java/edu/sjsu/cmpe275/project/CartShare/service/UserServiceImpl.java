package edu.sjsu.cmpe275.project.CartShare.service;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.project.CartShare.model.User;
import edu.sjsu.cmpe275.project.CartShare.repository.UserRepository;
import edu.sjsu.cmpe275.project.CartShare.utils.EmailUtility;
import edu.sjsu.cmpe275.project.CartShare.utils.HashingUtility;

public class UserServiceImpl {

    @Autowired
    UserRepository userRepository;

    @Override
    public void register(User user) {
        user.setPassword(HashingUtility.createHashedCode(user.getPassword()));
        System.out.println("Password: " + user.getPassword());
        userRepository.save(user);
    }

}