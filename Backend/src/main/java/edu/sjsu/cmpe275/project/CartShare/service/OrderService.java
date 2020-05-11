package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import edu.sjsu.cmpe275.project.CartShare.model.Order_Items;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderItemsRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.ProductRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
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
    private OrderItemsRepository orderItemsRepository;  
    
//    @Autowired
//    private UserRepository userRepository;    

//    public ResponseEntity<?> addOrder( long storeId, String deliveryAddress, OrderItemsList orderItems){ 	
//    	
//    	System.out.println("Inside addOrder Service");
//    	List<Order_Items> order_items = orderItems.getOrder_items();
//    	Order order = new Order();    	
//    	float totalPrice = 0;    	
//    	for(Order_Items item : order_items) {
//	    	totalPrice += item.getPrice();    
//	    	item.toString();
//	    	orderItemsRepository.saveAndFlush(item);
//	    }    	
//    	order.setPrice(totalPrice);
// 	    order.setStatus("NEW_ORDER");
// 	   Optional<Store> store = storeRepository.findById(storeId);
//   	
//	    if(store.isPresent())
//	    {
//	    	order.setStore(store.get());
//	    }
//	    
//	    order.setDeliveryAddress(deliveryAddress);
//	    order.setOrderTime(new Timestamp(System.currentTimeMillis()));
//	    order.setOrder_items(order_items); 
//    	orderRepository.saveAndFlush(order);
////    	User buyer = userRepository.findById(buyerId);
//    	
////    	if(!Objects.isNull(buyer))
////    	{
////    		order.setBuyerId(buyer);
////    	}    	
////    	
//    	for(Order_Items item : order_items) {
//	    	item.setOrder(order);
//	    	orderItemsRepository.saveAndFlush(item);
//	    }
//	   
////	    order.setPool(buyer.getPool());
//	   
//	    orderRepository.saveAndFlush(order);
//    	
////        productRepository.saveAndFlush(product);
////        ProductId id = product.getId();
////
////
////        Optional<Store> store = storeRepository.findById(id.getStoreId());
////        productRepository.saveAndFlush(product);
//////        store.get().setProducts(product);
////        if(store.isPresent()){
////            List<Product> listproducts = store.get().getProducts();
////            listproducts.add(product);
////            store.get().setProducts(listproducts);
////        }
////
////        storeRepository.saveAndFlush(store.get());
////        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(product);
//	    return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(order);
//    }
    
 public ResponseEntity<?> addOrder( Order order){ 	
    	
    	System.out.println("Inside addOrder Service");
    	
    	List<Order_Items> order_items =  order.getOrder_items();
    	for(Order_Items item : order_items)
    	{
    		ProductId id = new ProductId();
    		long storeid = id.getStoreId(); 
    		long sku = id.getSku();
    		
    		storeid = item.getProduct().getId().getStoreId();
    		sku = item.getProduct().getId().getSku();
    		System.out.println(storeid);
    		System.out.println(sku);
    		
    		id.setSku(sku);
    		id.setStoreId(storeid);
    		Product product = productRepository.findById(id).get();
    		System.out.println("Inside product is Present");
    		item.setProduct(product);
    		orderItemsRepository.saveAndFlush(item);
    		    		
    		
    	}
    	order.setOrder_items(order_items);
    	order.setOrderTime(new Date());
    	orderRepository.saveAndFlush(order);
    	
    	return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(order);
    }

    
}
