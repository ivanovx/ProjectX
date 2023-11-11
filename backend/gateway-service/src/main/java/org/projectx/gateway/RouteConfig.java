package org.projectx.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@Configuration
public class RouteConfig {
    private final DiscoveryClient discoveryClient;

    public RouteConfig(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder routeBuilder) {
        ServiceInstance devices = discoveryClient.getInstances("device-service").get(0);
        ServiceInstance measurements = discoveryClient.getInstances("measurement-service").get(0);

        return routeBuilder.routes()
                .route(r -> r.path("/devices/**").uri(devices.getUri()))
                .route(r -> r.path("/measurements/**").uri(measurements.getUri()))
                .build();
    }
}
