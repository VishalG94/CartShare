package edu.sjsu.cmpe275.project.CartShare.service;

import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
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



}
