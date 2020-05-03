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

    @Autowired
    EmailService emailService;

    @Autowired
    UserRepository userRepository;

    private static final String USER_VERIFICATION_EXCEPTION_MESSAGE = "User account verification failed";

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

    @RequestMapping(value = "/verifyaccount", method = RequestMethod.GET)
    public ResponseEntity<?> verifyUserAccount(@RequestParam Long ID) {
        System.out.println("Verification link clicked" + ID);
        try {
            boolean verificationStatus = userService.verifyUserRegistration(ID);
            System.out.println("verificationStatus: " + verificationStatus);
            if (verificationStatus) {
                return new ResponseEntity<>("{\"status\" : \"User is verified successfully!!\"}", HttpStatus.OK);
            } else if (!verificationStatus) {
                return new ResponseEntity<>(
                        "{\"status\" : \"User could not be verified because of bad request from user!!\"}",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exp) {
            System.out.println("Verification Exception:" + exp.getMessage());
            throw new CustomException(USER_VERIFICATION_EXCEPTION_MESSAGE);
        }
        return new ResponseEntity<>("{\"status\" : \"User could not be verified because of server error!!\"}",
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/oauthverified/{email}")
    public ResponseEntity<?> verifyUserOauthAccount(@PathVariable String email) {
        System.out.println("User ID sent as a parmeter : " + email);
        if (userRepository.findByEmail(email) == null) {
            System.out.println("User is not present");
            return new ResponseEntity<>("{\"status\" : \"User is not registered with any oauth login!!\"}",
                    HttpStatus.NOT_FOUND);
        }
        User verifiedUser = userService.checkUserVerified(email);
        System.out.println("verifiedUser : " + verifiedUser);
        if (verifiedUser == null) {
            new ResponseEntity<>("{\"status\" : \"User could not be verified because of bad request from user!!\"}",
                    HttpStatus.BAD_REQUEST);
        } else
            return ResponseEntity.ok(verifiedUser);
        return new ResponseEntity<>(
                "{\"status\" : \"User could not be verified because of bad request from user..!!\"}",
                HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@Valid @RequestBody User user) throws URISyntaxException {
        System.out.println("Body sent : " + user.getEmail());
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser == null) {
            System.out.println("User does not exist");
            return new ResponseEntity<>("{\"status\" : \"Cannot login. User is not registered, first sign up..!!\"}",
                    HttpStatus.NOT_FOUND);
        }
        if (!existingUser.isVerified()) {
            System.out.println("User is not verified");
            return new ResponseEntity<>("{\"status\" : \"Cannot login. user is not verified yet..!!\"}",
                    HttpStatus.NOT_ACCEPTABLE);
        }
        boolean authorizedUser = userService.loginUser(user);
        if (!authorizedUser) {
            System.out.println("User entered wrong email or password");
            return new ResponseEntity<>("{\"status\" : \"User entered wrong email or password..!!\"}",
                    HttpStatus.BAD_REQUEST);
        }
        System.out.println("User logged in successfully");
        return ResponseEntity.ok(existingUser);
    }
}