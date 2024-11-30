package ru.raytrace.indexer.service;

import lombok.SneakyThrows;
import okhttp3.*;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import ru.raytrace.indexer.sql.Helper;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@Service
@DependsOn(value = "indexinitializatorservice")
public class IngestService {

    private final OkHttpClient client;
    public static final MediaType JSON = MediaType.get("application/json");

    public IngestService(OkHttpClient client) {
        this.client = client;
        ingestToElastic();
    }

    @SneakyThrows
    public String getAllProducts() {
        StringBuilder result = new StringBuilder();

        Connection connection = Helper.getConnection();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(
                "select articul, title, description, price, sale, url, rating, reviews, pc.name as category, m.name as merchant  from items as i\n" +
                        "INNER JOIN product_categories AS pc ON pc.\"productCategoryId\" = i.\"productCategoryId\"\n" +
                        "INNER JOIN merchants AS m ON m.\"merchantId\" = i.\"merchantId\"");

        while (resultSet.next()) {
            String articul = resultSet.getString("articul");
            String price = resultSet.getString("price");
            String description = resultSet.getString("description");
            String title = resultSet.getString("title");
            int sale = resultSet.getInt("sale");
            String merchant = resultSet.getString("merchant");
            String url = resultSet.getString("url");
            Float rating = resultSet.getFloat("rating");
            int reviews = resultSet.getInt("reviews");
            String category = resultSet.getString("category");

           result.append("{ \"index\" : { \"_index\" : \"products\" } }");
           result.append("{ \"articul\": \""+articul+"\", \"title\": \""+title+"\", \"description\": \""+description+"\", \"avg_rating\": "+rating+", \"price\": "+price+", \"merchant\":  \""+merchant+"\", \"rating_count\": "+reviews+", \"category\": \""+category+"\", \"sale_percentage\": "+sale+", \"url\": \""+url+"\"}");
        }
        return result.toString();
    }

    public void ingestToElastic() {
        String data = getAllProducts();

        RequestBody requestBody = RequestBody.create(data, JSON);
        Request request = new Request.Builder()
                .url("https://localhost:9200/_bulk?pretty&pipeline=ent-search-generic-ingestion")
                .post(requestBody)
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
