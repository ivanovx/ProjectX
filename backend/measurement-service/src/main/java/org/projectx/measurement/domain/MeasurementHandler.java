package org.projectx.measurement.domain;

import org.projectx.measurement.client.TokenResponse;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreakerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class MeasurementHandler {

    private final WebClient webClient;

    private final MeasurementRepository measurementRepository;

    private final ReactiveCircuitBreaker tokenCircuitBreaker;

    public MeasurementHandler(WebClient webClient, MeasurementRepository measurementRepository, ReactiveCircuitBreakerFactory circuitBreakerFactory) {
        this.webClient = webClient;
        this.measurementRepository = measurementRepository;
        this.tokenCircuitBreaker = circuitBreakerFactory.create("token");
    }

    public Mono<ServerResponse> getMeasurements(ServerRequest request) {
        String deviceId = request.pathVariable("id");
        Flux<Measurement> measurements = measurementRepository.findByDeviceId(deviceId);

        return ServerResponse.ok().body(measurements, Measurement.class);
    }

    public Mono<ServerResponse> putMeasurement(ServerRequest request) {
        return request
                .bodyToMono(MeasurementRequest.class)
                .flatMap(body -> {
                    String deviceId = request.pathVariable("id");
                    String apiKey = request.headers().firstHeader("X-API-KEY");
                    String apiSecret = request.headers().firstHeader("X-API-SECRET");

                    return tokenCircuitBreaker
                            .run(webClient.get().uri("/tokens/" + deviceId).retrieve().bodyToMono(TokenResponse.class))
                            .flatMap(tokenResponse -> {
                                if(!tokenResponse.value().equals(apiKey)) {
                                    return ServerResponse.status(401).build();
                                }

                                return ServerResponse.status(201).body(Mono.just(body), MeasurementRequest.class);
                            });
                });
    }

    private record VerifyToken(String token, String deviceId){}
}