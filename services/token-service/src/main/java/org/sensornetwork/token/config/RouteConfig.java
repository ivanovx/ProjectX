package org.sensornetwork.token.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

import org.sensornetwork.token.handler.TokenHandler;

@Configuration
public class RouteConfig {
    private final TokenHandler tokenHandler;

    public RouteConfig(TokenHandler tokenHandler) {
        this.tokenHandler = tokenHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/tokens/{deviceId}", tokenHandler::getDeviceToken)
                .POST("/tokens/{deviceId}", tokenHandler::createDeviceToken)
                //.POST("/tokens", tokenHandler::verifyToken)
                .build();
    }
}
