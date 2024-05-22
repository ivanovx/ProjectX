package org.sensornetwork.device.config;

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

    @Bean(name="TOKEN_WEB_CLIENT")
    public WebClient tokenClient() {
        String baseUrl = eurekaClient.getNextServerFromEureka("token-service", false).getHomePageUrl();

        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
