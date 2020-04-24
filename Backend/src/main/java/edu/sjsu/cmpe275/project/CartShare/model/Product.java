package edu.sjsu.cmpe275.project.CartShare.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Table (name = "product")
@EntityListeners(AuditingEntityListener.class)
public class Product implements Serializable{

	@EmbeddedId
	private ProductId id;
	
	@Column(name = "name", nullable = false)
	 private String name;
	
	@Column(name = "description", nullable = false)
	 private String description;

	@Column(name = "imageurl", nullable = false)
	 private String imageurl;

	@Column(name = "brand", nullable = false)
	 private String brand;
	
	@Column(name = "unit", nullable = false)
	 private long unit;
	
	@Column(name = "price", nullable = false)
	 private double price;
	
	//Seperate field needed or can we reuse the storeId present in this model
	@ManyToOne
	@JoinColumn(name="store_id",nullable=false)
	private Store store;
	
	public Product()
	{		
	}

	public Product(ProductId id, String name, String description, String imageurl, String brand, long unit,
			double price, Store store)
	{		
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageurl = imageurl;
		this.brand = brand;
		this.unit = unit;
		this.price = price;
		this.store = store;
	}

	public ProductId getId() {
		return id;
	}

	public void setId(ProductId id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}	
	
	public long getUnit() {
		return unit;
	}

	public void setUnit(long unit) {
		this.unit = unit;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}	
	
	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}
	
}
