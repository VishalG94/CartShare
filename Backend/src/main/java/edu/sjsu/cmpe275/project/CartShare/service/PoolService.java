package edu.sjsu.cmpe275.project.CartShare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.project.CartShare.model.Pool;
import edu.sjsu.cmpe275.project.CartShare.model.User;
import edu.sjsu.cmpe275.project.CartShare.repository.PoolRepository;
import edu.sjsu.cmpe275.project.CartShare.repository.UserRepository;

@Service
public class PoolService {

    @Autowired
    PoolRepository poolRepository;

    @Autowired
    UserRepository userRepository;

    public void addPool(Pool pool, String mail) {
        System.out.println("data sent is : " + pool.getPoolId());
        User user = userRepository.findByEmail(mail);
        String pid = pool.getPoolId();

        poolRepository.saveAndFlush(pool);

        Pool newPool = poolRepository.findBypoolId(pid);

        List<User> poolersList = newPool.getPoolers();
        // System.out.println(poolersList);
        poolersList.add(user);
        // System.out.println(poolersList);
        newPool.setPoolLeader(user);

        user.setPool(newPool);
        user.setRole("POOL_LEADER");
        poolRepository.saveAndFlush(newPool);
        userRepository.saveAndFlush(user);
        // List<User> poolersList = new ArrayList<>();
        // List<User> poolersList = pool.getPoolers();
        // System.out.println(poolersList);
        // poolersList.add(user);
        // System.out.println(poolersList);
        // List<User> poolersList1 = pool.getPoolers();
        // for (User pooler : poolersList1) {
        // System.out.println("Pooler added is " + pooler.getEmail());
        // }

        // pool.setPoolers(poolersList);
        // pool.setPoolLeader(user);
        // poolRepository.save(pool);
    }
}
