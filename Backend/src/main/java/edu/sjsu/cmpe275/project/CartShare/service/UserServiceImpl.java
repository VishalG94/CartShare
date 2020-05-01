package edu.sjsu.cmpe275.project.CartShare.service;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.project.CartShare.model.User;
import edu.sjsu.cmpe275.project.CartShare.repository.UserRepository;
import edu.sjsu.cmpe275.project.CartShare.utils.EmailUtility;
import edu.sjsu.cmpe275.project.CartShare.utils.HashingUtility;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        User user = null;
        user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public void register(User user) {
        user.setPassword(HashingUtility.createHashedCode(user.getPassword()));
        System.out.println("Password: " + user.getPassword());
        userRepository.save(user);
    }

    @Override
    public User checkUserVerified(String email) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean loginUser(User user) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean verifyUserRegistration(Long ID) {
        // TODO Auto-generated method stub
        return false;
    }

}