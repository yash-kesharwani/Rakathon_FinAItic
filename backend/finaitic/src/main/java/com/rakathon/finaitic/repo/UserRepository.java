package com.rakathon.finaitic.repo;

import com.rakathon.finaitic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
//    @Query("Select * from user_details where email= ?1;")
    Optional<User> findByEmail(String email);
}
