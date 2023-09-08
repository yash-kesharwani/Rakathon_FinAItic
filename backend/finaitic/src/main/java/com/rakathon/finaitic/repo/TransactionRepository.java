package com.rakathon.finaitic.repo;

import com.rakathon.finaitic.entity.Transaction;
import com.rakathon.finaitic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {



}
