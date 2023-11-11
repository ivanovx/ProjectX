package org.projectx.device.config;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    private final DiscoveryClient discoveryClient;

    public WebClientConfig(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @Bean
    public WebClient webClient() {
        String baseUrl = discoveryClient.getInstances("token-service").get(0).getUri().toString();

        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
