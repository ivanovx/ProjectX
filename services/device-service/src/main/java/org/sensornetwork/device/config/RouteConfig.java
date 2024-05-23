package org.sensornetwork.device.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import org.sensornetwork.device.handler.TokenHandler;
import org.sensornetwork.device.handler.DeviceHandler;

@Configuration
public class RouteConfig {
    private final DeviceHandler deviceHandler;
    private final TokenHandler tokenHandler;

    public RouteConfig(DeviceHandler deviceHandler, TokenHandler tokenHandler) {
        this.deviceHandler = deviceHandler;
        this.tokenHandler = tokenHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/devices/all", deviceHandler::getAllDevices)
                .GET("/devices/user", deviceHandler::getAllDevicesByUser)
                .POST("/devices/create", deviceHandler::createDevice)
                //.GET("/devices/{deviceId}", deviceHandler::getDevice)
                .GET("/devices/{deviceId}/token", tokenHandler::getDeviceToken)
                .POST("/devices/{deviceId}/token", tokenHandler::createDeviceToken)
                .build();
    }
}