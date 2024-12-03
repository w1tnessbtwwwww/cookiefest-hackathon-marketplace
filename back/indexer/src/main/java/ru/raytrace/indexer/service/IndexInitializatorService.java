package ru.raytrace.indexer.service;

import okhttp3.*;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;

@Service
public class IndexInitializatorService {

    private final OkHttpClient client;
    public static final MediaType JSON = MediaType.get("application/json");

    public IndexInitializatorService(OkHttpClient client) {
        this.client = client;
        initialize();
    }

    public void initialize() {
        File json = new File(getClass().getClassLoader().getResource("indexinit.json").getFile());

        RequestBody requestBody = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url("http://localhost:9200/products")
                .put(requestBody)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "ApiKey ZHc1ZWZaTUI4M0VKUEtHT2tUTUQ6SmY1UnNhSHdTN0s2YUwtemJ2d1ZfZw==")
                .build();
        try (Response response = client.newCall(request).execute()) {
            System.out.println(response.body().string());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
