package org.sensornetwork.measurement.handler;

import org.sensornetwork.common.request.MeasurementRequest;
import org.sensornetwork.common.request.TokenVerifyRequest;
import org.sensornetwork.measurement.domain.Measurement;
import org.sensornetwork.measurement.domain.MeasurementRepository;
import org.sensornetwork.measurement.domain.MeasurementValue;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreakerFactory;

import org.sensornetwork.common.response.TokenResponse;

import java.time.LocalDateTime;

@Component
public class MeasurementHandler {

    private final WebClient webClient;

    private final MeasurementRepository measurementRepository;

    private final ReactiveCircuitBreaker tokenCircuitBreaker;
    private final HandlerMapping resourceHandlerMapping;

    public MeasurementHandler(
            WebClient webClient,
            MeasurementRepository measurementRepository,
            ReactiveCircuitBreakerFactory circuitBreakerFactory,
            @Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.webClient = webClient;
        this.measurementRepository = measurementRepository;
        this.tokenCircuitBreaker = circuitBreakerFactory.create("token");
        this.resourceHandlerMapping = resourceHandlerMapping;
    }

    public Mono<ServerResponse> getMeasurements(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");
        Flux<Measurement> measurements = measurementRepository.findByDeviceId(deviceId);

        return ServerResponse.ok().body(measurements, Measurement.class);
    }

    public Mono<ServerResponse> putMeasurement(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");
        String apiKey = request.headers().firstHeader("X-API-KEY");

        return request
                .bodyToMono(MeasurementRequest.class)
                .flatMap(measurementRequest -> {
                    MeasurementValue values = MeasurementValue.builder()
                            .temperature(measurementRequest.temperature())
                            .airQualityIndex(measurementRequest.airQualityIndex())
                            .vocIndex(measurementRequest.vocIndex())
                            .build();

                    Measurement measurement = Measurement.builder()
                            .deviceId(deviceId)
                            .timestamp(LocalDateTime.now())
                            .values(values)
                            .build();

                    //TokenVerifyRequest verifyRequest = new TokenVerifyRequest(apiKey, deviceId);

                    return measurementRepository.save(measurement).flatMap(m -> ServerResponse.status(201).bodyValue(m));

                    /*Mono<ServerResponse> response = webClient
                            .post()
                            .uri("/tokens")
                            .body(BodyInserters.fromValue(verifyRequest))
                            .exchangeToMono(ex -> ex.bodyToMono(String.class))
                            .flatMap(res -> {
                                if (res.equals("VALID")) {
                                    return ServerResponse.status(201).bodyValue(res);//.body(Mono.just(res), String.class);
                                }

                                return ServerResponse.status(401).bodyValue("Not Authorized");
                            });

                    return tokenCircuitBreaker.run(response, throwable -> ServerResponse.badRequest().bodyValue(throwable.getMessage()));*/
                });
    }
}