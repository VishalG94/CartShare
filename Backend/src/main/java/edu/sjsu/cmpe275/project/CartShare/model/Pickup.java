package edu.sjsu.cmpe275.project.CartShare.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Table (name = "pickup")
@EntityListeners(AuditingEntityListener.class)
public class Pickup {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;	 
	
	@Column(name = "pickupperson_id", nullable = false)
	private String pickupPerson;
	
	@OneToMany
	@JoinColumn(name="order_id",nullable=false)
	private List<Order> orders;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	public Pickup()
	{		
	}

	public Pickup(long id, String pickupPerson, List<Order> orders, String status) {
		super();
		this.id = id;
		this.pickupPerson = pickupPerson;
		this.orders = orders;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPickupPerson() {
		return pickupPerson;
	}

	public void setPickupPerson(String pickupPerson) {
		this.pickupPerson = pickupPerson;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
