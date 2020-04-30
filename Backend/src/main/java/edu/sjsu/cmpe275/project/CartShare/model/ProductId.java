package edu.sjsu.cmpe275.project.CartShare.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Embeddable;
import java.io.Serializable;
import javax.persistence.*;

@Embeddable
public class ProductId implements Serializable
{
	
	@Column(name="store_id")
	private int storeId;
	
	@Column(name="sku")
	private int sku;
	
	public ProductId()
	{		
	}

	public ProductId(int storeId, int sku) 
	{		
		this.storeId = storeId;
		this.sku = sku;
	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public int getSku() {
		return sku;
	}

	public void setSku(int sku) {
		this.sku = sku;
	}	
    
}
