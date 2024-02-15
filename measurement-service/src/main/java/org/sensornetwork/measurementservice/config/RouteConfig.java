package org.sensornetwork.measurementservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import org.sensornetwork.measurementservice.measurement.MeasurementHandler;

@Configuration
public class RouteConfig {

    private final MeasurementHandler measurementHandler;

    public RouteConfig(MeasurementHandler measurementHandler) {
        this.measurementHandler = measurementHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/measurements/{id}", measurementHandler::getMeasurements)
                .POST("/measurements/{id}", measurementHandler::putMeasurement)
                .build();
    }
}
