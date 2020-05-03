package edu.sjsu.cmpe275.project.CartShare.controller;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
public class StoreController {
	
	@GetMapping("/")
    public String get() {
        return "Working!";
    }
	
	
	
	
	
	
	
	

}
