package edu.sjsu.cmpe275.project.CartShare.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.sjsu.cmpe275.project.CartShare.model.Address;
import edu.sjsu.cmpe275.project.CartShare.model.Product;
import edu.sjsu.cmpe275.project.CartShare.model.ProductId;
import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.repository.ProductRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
//import edu.sjsu.cmpe275.project.CartShare.service.AmazonClient;
import edu.sjsu.cmpe275.project.CartShare.service.ProductService;
import edu.sjsu.cmpe275.project.CartShare.service.StoreService;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.DataInput;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Transactional
@CrossOrigin(origins = "*", allowCredentials = "true")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    ProductRepository productRepository;

//    private AmazonClient amazonClient;
    @Autowired
    StoreRepository storeRepository;
//
//    @Autowired
//    ProductController(AmazonClient amazonClient) {
//        this.amazonClient = amazonClient;
//    }

    @PostMapping(value="/addproduct", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> addProduct(@RequestBody Product product,
                                      HttpServletRequest request) throws JSONException {
        System.out.println("inside create product controller: "+product.toString());

        return productService.addProduct(product);
    }

//@PostMapping(value="/addproduct", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
//    public ResponseEntity<?> addProduct(@RequestPart(value = "data") String data,@RequestPart(value = "files") MultipartFile[] files) throws JsonMappingException, JsonProcessingException{
//        String response = "";
//        ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        Product prop;
//
//        try {
//            prop = mapper.readValue(data, Product.class);
//            for(MultipartFile file : files)
//            {
//                System.out.println("started upload");
//                response += this.amazonClient.uploadFile(file);
//                System.out.println("ended upload : " + response );
//            }
//
//            prop.setImageurl(response);
//
//            System.out.println("Images sting: " + prop.getImageurl());
//        }
//        catch (JsonMappingException e){
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//        catch (Exception e){
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//
//        productService.addProduct(prop);
//        return ResponseEntity.ok(prop);
//    }

    @GetMapping("/getproducts/{id}")
        public ResponseEntity<?> getProducts(@PathVariable Long id) {
        return productService.getproducts(id);
    }

    @GetMapping("/getmaxsku")
    public ResponseEntity<?> getMaxSku() {
        return productService.getMaxSku();
    }

    @DeleteMapping("/deleteproduct")
    public ResponseEntity<?> deleteProduct(@RequestBody Product product) {
        System.out.println("Inside deleteproduct: "+ product.toString());
        return productService.deleteProduct(product);
    }

    @DeleteMapping("/deleteproductbyid/{storeId}/{sku}")
    public ResponseEntity<?> deleteProductbyid(@PathVariable Long storeId, @PathVariable Long sku) {
        ProductId id = new ProductId(storeId, sku);
        System.out.println("Inside deleteproduct: ");
        return productService.deleteProductById(id);
    }
}
