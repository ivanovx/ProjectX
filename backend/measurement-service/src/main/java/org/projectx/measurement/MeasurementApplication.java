package org.projectx.measurement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@SpringBootApplication
@EnableDiscoveryClient
public class MeasurementApplication {

    @Autowired
    private MeasurementHandler measurementHandler;

	public static void main(String[] args) {
		SpringApplication.run(MeasurementApplication.class, args);
	}

    @Bean
    public RouterFunction<ServerResponse> route() {
        return RouterFunctions.route()
                .GET("/measurements/{id}", measurementHandler::getMeasurements)
                .POST("/measurements/{id}", measurementHandler::putMeasurement)
                .build();
    }
}