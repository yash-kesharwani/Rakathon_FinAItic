package com.rakathon.finaitic.service;

import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
public interface TransactionService {
    boolean saveTransactions(String user, Path destinationFile);
}
