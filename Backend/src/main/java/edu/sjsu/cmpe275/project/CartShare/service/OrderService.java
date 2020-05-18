package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.model.*;
import edu.sjsu.cmpe275.project.CartShare.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private PoolRepository poolRepository;

	@Autowired
	private StoreRepository storeRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PickupRepository pickupRepository;

	@Autowired
	private OrderItemsRepository orderItemsRepository;

	public ResponseEntity<?> addOrder( Order order,Long userId, Optional<Long> numbOfOrdersToPcik){

		System.out.println("Inside addOrder Service");
		order.setOrderTime(new Date());
		Optional<User> user = userRepository.findById(userId);

		if(user.isPresent() && user.get().getPool() !=null)
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
			item.setStatus("PENDING");
			item.setOrder(order);
		}

		orderRepository.saveAndFlush(order);
		if(numbOfOrdersToPcik.isPresent()){

			Optional<List<Order>> orders  = orderRepository.findPoolOrdersById(user.get().getPool().getPoolId(), order.getStore().getId(), userId);
			System.out.println("Inside pickup other orders: "+orders.get().size());
//			Long len = orders.get().size()>numbOfOrdersToPcik.get()? numbOfOrdersToPcik.get() :Long.valueOf(orders.get().size());
			List newOrdersForPickup = new ArrayList();
			for(int i=0;i<numbOfOrdersToPcik.get();i++){
				newOrdersForPickup.add(orders.get().get(i));
			}
			Pickup newPickup = new Pickup(1,user.get(), newOrdersForPickup,"New" );
			System.out.println("Orders added to pickup: "+orders.get().size());
			pickupRepository.saveAndFlush(newPickup);
		}else{
			System.out.println("No other orders to pickup");
		}

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

	public ResponseEntity<?> getPoolOrders(Long storeId, Long userId) {

		System.out.println("inside get Pool Orders : "+userId);
		Optional<User> user = userRepository.findById(userId);

		if(user.isPresent())
		{
			Pool pool = user.get().getPool();
			Optional<List<Order>> poolOrders = orderRepository.findPoolOrdersById( pool.getPoolId(), storeId, userId);

			if(poolOrders.isPresent())
			{
				for (Order poolOrder : poolOrders.get()) {
					System.out.println(poolOrder.getBuyerId().getScreenName());
				}
				List<Order> poolorders = poolOrders.get();
				return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(poolorders);
			}

		}

		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body("");
	}

}