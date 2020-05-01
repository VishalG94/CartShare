package edu.sjsu.cmpe275.project.CartShare.controller;

import java.net.URISyntaxException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.project.CartShare.exception.CustomException;
import edu.sjsu.cmpe275.project.CartShare.model.User;
import edu.sjsu.cmpe275.project.CartShare.repository.UserRepository;
import edu.sjsu.cmpe275.project.CartShare.service.EmailService;
import edu.sjsu.cmpe275.project.CartShare.service.UserService;
import edu.sjsu.cmpe275.project.CartShare.utils.EmailUtility;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class UserSignupController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<String> registration(@Valid @RequestBody User user) throws URISyntaxException {
        System.out.println("Body sent : " + user.getEmail());
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            System.out.println("User exists");
            return new ResponseEntity<>("{\"status\" : \"User with same email is already registered .!!\"}",
                    HttpStatus.FOUND);
        }
        userService.register(user);
        String message = EmailUtility.createVerificationMsg(user.getID());
        emailService.sendEmail(user.getEmail(), message, " User Profile Verification");
        return new ResponseEntity<>("{\"status\" : \"User Registered Successfully.!!\"}", HttpStatus.OK);
    }
}