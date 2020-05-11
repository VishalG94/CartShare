package edu.sjsu.cmpe275.project.CartShare.repository;

import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import edu.sjsu.cmpe275.project.CartShare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, ProductId> {

    public Product findByName(String name);

    @Query(value = "SELECT max(p.id.sku) FROM Product p")
    public Long getMaxSku();

    @Query(value = "SELECT p FROM Product p WHERE p.id.storeId = :storeId AND p.id.sku = :sku")
    public Product findProductById(@Param("storeId") Long storeId, @Param("sku") Long sku);

}


