package edu.sjsu.cmpe275.project.CartShare.controller;

import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.service.ProductService;
import edu.sjsu.cmpe275.project.CartShare.service.StoreService;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Transactional
@CrossOrigin(origins = "*", allowCredentials = "true")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;
    @PostMapping(value="/addproduct", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> addProduct(
//            @RequestBody Product product,
//                                      @RequestParam(value = "name") String name,
//                                      @RequestParam(value = "description") String description,
//                                      @RequestParam(value = "brand") String brand,
//                                      @RequestParam(value = "price") double price,
//                                      @RequestParam(value = "unit") String unit,
//                                      @RequestParam(value = "storeId") long[] storeId,
//                                      @RequestParam(value = "storeId") Store[] store,
                                        @RequestBody Product product,
                                      HttpServletRequest request) throws JSONException {
        System.out.println("inside create product controller: "+product.toString());
//        return productService.addProduct(name,description,brand,price,unit,storeId,store);
        return productService.addProduct(product);
    }

//    @GetMapping("/getstores")å
//    public ResponseEntity<?> getStores(){
//        return storeService.getStores()
//    }
}
