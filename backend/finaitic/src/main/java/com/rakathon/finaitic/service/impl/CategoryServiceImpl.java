package com.rakathon.finaitic.service.impl;

import com.rakathon.finaitic.service.CategoryService;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
@Service
public class CategoryServiceImpl implements CategoryService {
    Logger log = LoggerFactory.getLogger(this.getClass());
    @Value("${finaitic.app.model.url}")
    private String modelUrl;

    public boolean generateFile(String user) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse(modelUrl).newBuilder();
        urlBuilder.addPathSegment(user);
        String promUrl = urlBuilder.build().toString();
        int timeout = 10;
        try {
            OkHttpClient client = new OkHttpClient().newBuilder().followRedirects(true).connectTimeout(timeout, TimeUnit.SECONDS).readTimeout(timeout, TimeUnit.SECONDS).build();
            Request request = new Request.Builder()
                    .url(promUrl).method("GET", null).build();
            Response response = client.newCall(request).execute();
            return (response.code() == 200);
        } catch (IOException e) {
            log.error("executeQuery: Exception while connecting to Prometheus.");
            return false;
        }
    }
}
