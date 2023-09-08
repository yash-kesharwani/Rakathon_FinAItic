package com.rakathon.finaitic.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileUploadService {
    boolean store(MultipartFile file, String user);
}
