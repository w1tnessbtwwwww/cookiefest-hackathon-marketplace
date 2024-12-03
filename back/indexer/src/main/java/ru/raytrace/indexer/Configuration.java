package ru.raytrace.indexer;


import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;



@org.springframework.context.annotation.Configuration
@ComponentScan(basePackages = { "ru.raytrace" })
public class Configuration {

    @Bean
    OkHttpClient OkHttpClient() {
        return new OkHttpClient();
    }

}

