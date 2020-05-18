package edu.sjsu.cmpe275.project.CartShare.controller;


import edu.sjsu.cmpe275.project.CartShare.model.Order;
import edu.sjsu.cmpe275.project.CartShare.service.OrderService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

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
            @RequestParam(required = false) Long numbOfOrdersToPcik,
            HttpServletRequest request) throws JSONException {

        System.out.println("Buyer ID is "+userId);
        System.out.println("Order Count is "+numbOfOrdersToPcik);
        numbOfOrdersToPcik = Long.valueOf(1);
        return orderService.addOrder(order,userId, Optional.ofNullable(numbOfOrdersToPcik));

    }

    @GetMapping("/getorders")
    public ResponseEntity<?> getOrders(@RequestParam Long id) {
        System.out.println("Inside GetOrders "+id);
        return orderService.getorders(id);
    }

    @GetMapping("/getpoolorders")
    public ResponseEntity<?> getPoolOrders(@RequestParam(value = "storeid") Long storeId, @RequestParam(value = "userid") Long userId)
    {
        System.out.println("Inside Get Pool Orders");

        return orderService.getPoolOrders(storeId,userId);
    }


}