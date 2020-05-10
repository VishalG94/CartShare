package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import edu.sjsu.cmpe275.project.CartShare.model.Order_Items;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderItemsRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.ProductRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.UserRepository;
import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Order;
import edu.sjsu.cmpe275.project.CartShare.model.Order_Items;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;
    
    @Autowired
    private OrderRepository orderRepository;    
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrderItemsRepository orderItemsRepository;  
     
 public ResponseEntity<?> addOrder( Order order,Long userId){ 	
    	
    	System.out.println("Inside addOrder Service");
    	order.setOrderTime(new Date());   	
    	Optional<User> user = userRepository.findById(userId);
    	
    	if(user.isPresent())
    	{
    		order.setBuyerId(user.get());
    		order.setPool(user.get().getPool());    		
    	}
    	orderRepository.saveAndFlush(order);
     	
    	List<Order_Items> order_items =  order.getOrder_items();
    	for(Order_Items item : order_items)
    	{
    		System.out.println("Inside for loop in addOrder Service");
    		item.setOrderTime(new Date());
    		item.setStatus("NOT_AVAILABLE_PICKUP");
    		item.setOrder(order); 
    	}    	
    	
    	orderRepository.saveAndFlush(order);
    	
    	return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(order);
    }

public ResponseEntity<?> getorders(Long id) {
	  System.out.println("inside getOrder : "+id);
      Optional<List<Order>> orders = orderRepository.findOrdersById(id);
     
      System.out.println(orders.get());
      if(orders.isPresent())
      {
    	  System.out.println("Orders are present");
    	  return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(orders);
      }
      
      return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body("");
      	
}

    
}
