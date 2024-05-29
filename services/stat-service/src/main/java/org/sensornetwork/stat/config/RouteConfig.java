package org.sensornetwork.stat.config;

import org.sensornetwork.stat.handler.StatHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Component
public class RouteConfig {
    private final StatHandler statHandler;

    public RouteConfig(StatHandler statHandler) {
        this.statHandler = statHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/stats/{deviceId}", statHandler::getDeviceStats)
                .build();
    }
}
