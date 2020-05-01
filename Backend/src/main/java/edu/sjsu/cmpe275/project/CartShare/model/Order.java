package edu.sjsu.cmpe275.project.CartShare.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table (name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {
	
	@Id
	@Column(name = "orderid", nullable = false, unique = true)    
	private long orderid;	 		
	
	@ManyToOne
	@JoinColumn(name="buyer_id",nullable = false)
	private User buyerId;	
	
	@Column(name = "price", nullable = false)
    private float price;

	@Column(name = "status", nullable = false)
    private String status;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
	private Set<Order_Items> order_items;
	
	@ManyToOne
	@JoinColumn(name="store_id",nullable = false)
	private Store store;
	
	@ManyToOne
	@JoinColumn(name="pool_id",nullable = false)
	private Pool pool;
	
	
	@Column(name = "delivery_address", nullable = false)
    private String deliveryAddress;
	
//	@ManyToOne(mappedBy = pickup_orders)
//	private User pickupperson_Id;
	

	@Column(name = "ORDER_TIME")
	@Temporal(TemporalType.TIMESTAMP)
    private java.util.Date orderTime;
	
	public Order()
	{		
	}	
	
	public Order(long orderid, User buyerId, float price, String status, Set<Order_Items> order_items, Store store,
			Pool pool, String deliveryAddress, Date orderTime) {
		super();
		this.orderid = orderid;
		this.buyerId = buyerId;
		this.price = price;
		this.status = status;
		this.order_items = order_items;
		this.store = store;
		this.pool = pool;
		this.deliveryAddress = deliveryAddress;
		this.orderTime = orderTime;
	}
	
	public Pool getPool() {
		return pool;
	}

	public void setPool(Pool pool) {
		this.pool = pool;
	}




	public Set<Order_Items> getOrder_items() {
		return order_items;
	}
	
	public void setOrder_items(Set<Order_Items> order_items) {
		this.order_items = order_items;
	}

	public long getOrderid() {
		return orderid;
	}
	
	public void setOrderid(long orderid) {
		this.orderid = orderid;
	}

	

	public Store getStore() {
		return store;
	}


	public void setStore(Store store) {
		this.store = store;
	}
	
	public User getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(User buyerId) {
		this.buyerId = buyerId;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}	

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public java.util.Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(java.util.Date orderTime) {
		this.orderTime = orderTime;
	}	
	
}
