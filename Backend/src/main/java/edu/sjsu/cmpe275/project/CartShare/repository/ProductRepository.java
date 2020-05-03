package edu.sjsu.cmpe275.project.CartShare.repository;

import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, ProductId> {

    public Product findByName(String name);

    @Query(value = "SELECT max(p.id.sku) FROM Product p")
    public int findMaxSku();

}
