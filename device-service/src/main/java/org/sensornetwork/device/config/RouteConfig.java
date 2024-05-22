package org.sensornetwork.device.config;

import org.sensornetwork.device.handler.DeviceHandler;
import org.sensornetwork.device.handler.TokenHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

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
                .GET("/devices/{deviceId}/token", tokenHandler::getDeviceToken)
                .POST("/devices/{deviceId}/token", tokenHandler::createDeviceToken)
                .build();
    }
}