package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.model.Order;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderItemsRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.OrderRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.ProductRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<?> addStoreService(Store store) {
        System.out.println("Inside add store service");
        Optional<Store> validStore;
        validStore = Optional.ofNullable(storeRepository.findByName(store.getName()));
        if (validStore.isPresent()) {
           return ResponseEntity.status(HttpStatus.CONFLICT).body("Bad Parameter | Store with this name already exists.");
        }
        storeRepository.saveAndFlush(store);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(store);
    }

    public ResponseEntity<?> deleteStore(Long id) {
        System.out.println("inside delete store service");
        System.out.println("id"+id);
        Optional<Store> newstore = storeRepository.findById(id);
        System.out.println(newstore.get().getName());
        Optional<List<Order>> orders = orderRepository.findOrdersByStore(id);
//        System.out.println(orders.get().size());
        if (orders.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error : Unfulfilled Orders");
        }
        storeRepository.delete(newstore.get());

        return ResponseEntity.status(HttpStatus.OK).body("SuccessFully Deleted");
    }
}
