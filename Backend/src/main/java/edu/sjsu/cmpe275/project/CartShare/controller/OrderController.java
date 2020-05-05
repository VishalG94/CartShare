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
    
//    @PostMapping(value="/addorder", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
//    public ResponseEntity<?> addProduct(   
//  //  									@RequestParam(name = "buyer_id") long buyerId,
//    									@RequestParam(name = "store_id") long storeId,
//    									@RequestParam(name = "delivery_address") String deliveryAddress,
//                                        @RequestBody OrderItemsList order_items,
//                                      HttpServletRequest request) throws JSONException {
//    	List<Order_Items> list = order_items.getOrder_items();
//    	
//    	for(Order_Items item : list)
//    	{
//    		System.out.println(item);
//    	}
//    	
//        System.out.println("inside add order controller "+order_items.toString());
//        
//       return orderService.addOrder(storeId,deliveryAddress,order_items);
//        
//    }
//    
    @PostMapping(value="/addorder", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> addProduct(   
    								   
    									@RequestBody Order order,
                                      HttpServletRequest request) throws JSONException {
//    	List<Order_Items> list = order_items.getOrder_items();
//    	
//    	for(Order_Items item : list)
//    	{
//    		System.out.println(item);
//    	}
//    	
//        System.out.println("inside add order controller "+order_items.toString());
//        
       return orderService.addOrder(order);
        
    }


}
