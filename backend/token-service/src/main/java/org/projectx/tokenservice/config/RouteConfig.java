package org.projectx.tokenservice.config;

import org.projectx.tokenservice.token.TokenHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RouteConfig {
    private final TokenHandler tokenHandler;

    public RouteConfig(TokenHandler tokenHandler) {
        this.tokenHandler = tokenHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/tokens/{deviceId}", tokenHandler::getToken)
                .POST("/tokens/{deviceId}", tokenHandler::createToken)
                .POST("/tokens", tokenHandler::verifyToken)
                .build();
    }
}
