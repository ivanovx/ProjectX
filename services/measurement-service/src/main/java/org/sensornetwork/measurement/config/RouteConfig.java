package org.sensornetwork.measurement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import org.sensornetwork.measurement.handler.MeasurementHandler;

@Configuration
public class RouteConfig {

    private final MeasurementHandler measurementHandler;

    public RouteConfig(MeasurementHandler measurementHandler) {
        this.measurementHandler = measurementHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/measurements/{deviceId}", measurementHandler::getMeasurements)
                .POST("/measurements/{deviceId}", measurementHandler::putMeasurement)
                .PUT("/measurements/{deviceId}", measurementHandler::putMeasurement)
                .build();
    }
}
