package edu.sjsu.cmpe275.project.CartShare.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table (name = "order_items")
@EntityListeners(AuditingEntityListener.class)
public class Order_Items {
	
	@Id
	@Column(name = "id", nullable = false, unique = true)    
	private long id;	
	
	@ManyToOne
	@JoinColumn(name="orderid",nullable=false)
	private Order order;
	
	@OneToOne
	@JoinColumns({
			@JoinColumn(name="store_composit_id",  referencedColumnName="store_composit_id"),
			@JoinColumn(name="sku",  referencedColumnName="sku")
	})private Product product;

//	@JoinColumns({
//		@JoinColumn(name="product_id",referencedColumnName = "store_id"),
//		@JoinColumn(name="product_sku",referencedColumnName = "sku")
//	})

	
	@Column(name = "quantity", nullable = false)
    private int quantity;

	@Column(name = "price", nullable = false)
    private float price;

	@Column(name = "status", nullable = false)
    private String status;

	@Column(name = "order_time")
	@Temporal(TemporalType.TIMESTAMP)
    private java.util.Date orderTime;	
	

}
