package edu.sjsu.cmpe275.project.CartShare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.project.CartShare.model.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    // User findByEmail(String email);

    // Optional<User> findById(Long id);

    // User findByscreenName(String screenname);

    // void save(Optional<User> user);
}