package com.rakathon.finaitic.controller;

import com.rakathon.finaitic.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/transact")
public class TransactionController {

    @Autowired
    FileUploadService fileUploadService;

    @PostMapping(value = "/upload")
    public ResponseEntity<?> uploadStatement(@RequestParam("file") MultipartFile file, @RequestParam String user) {

        String message = "";
        try {
            boolean status = fileUploadService.store(file, user);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

}
