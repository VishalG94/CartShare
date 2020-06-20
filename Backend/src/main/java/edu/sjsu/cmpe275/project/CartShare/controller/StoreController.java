package edu.sjsu.cmpe275.project.CartShare.controller;

import edu.sjsu.cmpe275.project.CartShare.model.Store;
import edu.sjsu.cmpe275.project.CartShare.repository.StoreRepository;
import edu.sjsu.cmpe275.project.CartShare.service.StoreService;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Transactional
@CrossOrigin(origins = "*", allowCredentials = "true")
@RestController
public class StoreController {

    private static final Logger log = LoggerFactory.getLogger(StoreController.class);

    @Autowired
    StoreService storeService;

    @Autowired
    StoreRepository storeRepository;

    @PostMapping(value="/addstore", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> addStore(@RequestBody Store store,
                                      HttpServletRequest request) throws JSONException {
        System.out.println("inside create store controller");
        log.info("Store created with the name ",store.getName());
        return storeService.addStoreService(store);
    }

    @PutMapping(value="/editstore/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> editStore(@PathVariable Long id, @RequestBody Store store,
                                      HttpServletRequest request) throws JSONException {
        System.out.println("inside create store controller");
        log.info("Edited Store details for ",store.getName());
        return storeService.editStore(id, store);
    }



    @GetMapping("/getstores")
    public List<Store> getAllStores() { return storeRepository.findAll(); }

    @GetMapping("/getstore/{id}")
    public ResponseEntity<?> getStoreById(@PathVariable Long id) {
        return storeService.getStoreById(id);
    }

    @RequestMapping(value="/deletestore/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<?> deletStore(@PathVariable Long id){
        System.out.println("Inside delete store controller");
        log.info("Deleted Store with the id ",id);
        return storeService.deleteStore(id);
    }
}
