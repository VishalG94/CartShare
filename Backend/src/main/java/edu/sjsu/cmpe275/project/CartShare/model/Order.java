package edu.sjsu.cmpe275.project.CartShare.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Table (name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {
	
	@Id
	@Column(name = "order_id", nullable = false, unique = true)    
	private long order_id;	 		
	
	@ManyToOne
	@JoinColumn(name="buyer_id",nullable = false)
	private User buyerId;	
	
	@Column(name = "price", nullable = false)
    private float price;

	@Column(name = "status", nullable = false)
    private String status;

	@Column(name = "ORDER_TIME")
	@Temporal(TemporalType.TIMESTAMP)
    private java.util.Date orderTime;
	
	public Order()
	{
		
	}

	public Order(long order_id, User buyerId, float price, String status, Date orderTime)
	{		
		this.order_id = order_id;
		this.buyerId = buyerId;
		this.price = price;
		this.status = status;
		this.orderTime = orderTime;
	}

	public long getOrder_id() {
		return order_id;
	}

	public void setOrder_id(long order_id) {
		this.order_id = order_id;
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

	public java.util.Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(java.util.Date orderTime) {
		this.orderTime = orderTime;
	}	
	
}
