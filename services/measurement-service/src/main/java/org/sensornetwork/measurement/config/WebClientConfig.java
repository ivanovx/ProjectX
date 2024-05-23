package org.sensornetwork.measurement.config;

import com.netflix.discovery.EurekaClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    private final EurekaClient eurekaClient;

    public WebClientConfig(EurekaClient eurekaClient) {
        this.eurekaClient = eurekaClient;
    }

    @Bean
    public WebClient webClient() {
        String baseUrl = eurekaClient.getNextServerFromEureka("token-service", false).getHomePageUrl();

        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
