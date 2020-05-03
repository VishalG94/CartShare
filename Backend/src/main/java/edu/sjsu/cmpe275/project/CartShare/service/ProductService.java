package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import edu.sjsu.cmpe275.project.CartShare.repository.ProductRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;

    public ResponseEntity<?> addProduct(Product product){
//        productRepository.saveAndFlush(product);
        ProductId id = product.getId();


        Optional<Store> store = storeRepository.findById(id.getStoreId());
        productRepository.saveAndFlush(product);
//        store.get().setProducts(product);
        if(store.isPresent()){
            List<Product> listproducts = store.get().getProducts();
            listproducts.add(product);
            store.get().setProducts(listproducts);
        }

        storeRepository.saveAndFlush(store.get());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(product);
    }

//    public ResponseEntity<?> addProduct(String name, String description, String brand, double price, String unit, long[] storeId, Store[] store) {
//        System.out.println("Inside add product service");
//        long sku = productRepository.findMaxSku();
//        sku++;
////        long store_idd=(long)storeId;
//        List<Product> productsLst = new ArrayList<>();
//        for(int i=0;i<storeId.length;i++){
//            ProductId id = new ProductId(storeId[i],sku);
//            Product product=new Product();
//            product.setId(id);
//            product.setName(name);
//            product.setDescription(description);
//            product.setBrand(brand);
//            product.setPrice(price);
//            product.setUnit(unit);
//            product.setStore(store[i]);
//            productRepository.saveAndFlush(product);
//
//        }
////        Arrays.asList(storeId).stream().map(id -> {productService.addProduct(name,description,brand,price,unit,id)});
//
//
//
//
//        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(productsLst);
//    }
}
