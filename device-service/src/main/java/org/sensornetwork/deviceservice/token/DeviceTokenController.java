package org.sensornetwork.deviceservice.token;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreakerFactory;

import org.sensornetwork.common.response.TokenResponse;

@RestController
@RequestMapping("/devices")
public class DeviceTokenController {
    private final WebClient webClient;
    private final ReactiveCircuitBreaker tokenCircuitBreaker;

    public DeviceTokenController(WebClient webClient, ReactiveCircuitBreakerFactory circuitBreakerFactory) {
        this.webClient = webClient;
        this.tokenCircuitBreaker = circuitBreakerFactory.create("tokens");
    }

    @GetMapping("/{deviceId}/token")
    public Mono<TokenResponse> getDeviceToken(@PathVariable String deviceId) {
        Mono<TokenResponse> getDeviceToken = webClient.get()
                .uri("/tokens/" + deviceId)
                .retrieve()
                .bodyToMono(TokenResponse.class);

        return tokenCircuitBreaker.run(getDeviceToken, throwable -> Mono.just(new TokenResponse(null, null)));
    }

    @PostMapping("/{deviceId}/token")
    public Mono<TokenResponse> createDeviceToken(@PathVariable String deviceId) {

        Mono<TokenResponse> createDeviceToken = webClient.post()
                .uri("/tokens/" + deviceId)
                .retrieve()
                .bodyToMono(TokenResponse.class);

        return tokenCircuitBreaker.run(createDeviceToken, throwable -> Mono.just(new TokenResponse(null, null)));
    }
}
