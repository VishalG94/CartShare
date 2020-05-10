package edu.sjsu.cmpe275.project.CartShare.controller;


import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Order;
import edu.sjsu.cmpe275.project.CartShare.model.Order_Items;
import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.service.OrderService;
import edu.sjsu.cmpe275.project.CartShare.service.ProductService;
import edu.sjsu.cmpe275.project.CartShare.service.StoreService;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@Transactional
@CrossOrigin(origins = "*", allowCredentials = "true")
@RestController
public class OrderController {
    @Autowired
    OrderService orderService;
    
    @PostMapping(value="/addorder", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> addOrder(    								   
    									@RequestBody Order order,
    									@RequestParam Long userId,
                                      HttpServletRequest request) throws JSONException {
    	
    	System.out.println("Buyer ID is "+userId);
    	return orderService.addOrder(order,userId);
        
    }
    
    @GetMapping("/getorders")
    public ResponseEntity<?> getOrders(@RequestParam Long id) {
    	System.out.println("Inside GetOrders "+id);
    return orderService.getorders(id);
}


}
