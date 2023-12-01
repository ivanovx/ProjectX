package org.projectx.deviceservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.cloud.client.discovery.DiscoveryClient;

@Configuration
public class WebClientConfig {

    private final DiscoveryClient discoveryClient;

    public WebClientConfig(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @Bean
    public WebClient tokenClient() {
        String baseUrl = discoveryClient.getInstances("token-service").get(0).getUri().toString();

        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
