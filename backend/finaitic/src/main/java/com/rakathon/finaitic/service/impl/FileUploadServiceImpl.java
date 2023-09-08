package com.rakathon.finaitic.service.impl;

import com.rakathon.finaitic.config.StorageProperties;
import com.rakathon.finaitic.service.FileUploadService;
import com.rakathon.finaitic.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
@Service
public class FileUploadServiceImpl implements FileUploadService {

    Logger log = LoggerFactory.getLogger(this.getClass());
    private final Path rootLocation;
    @Autowired
    TransactionService transactionService;
    @Autowired
    public FileUploadServiceImpl(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }
    @Override
    public boolean store(MultipartFile file, String user) {
        try {
            if (file.isEmpty()) {
                return false;
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(user+".csv"))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                log.error("Cannot store file outside current directory.");
                return false;
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
                log.info("file saved to location.");
            }
            if(transactionService.saveTransactions(user, destinationFile)){
                log.info("transactions saved");
            }
            return true;
        }
        catch (IOException e) {
            log.error("Failed to store file.", e);
            return false;
        }

    }
}
