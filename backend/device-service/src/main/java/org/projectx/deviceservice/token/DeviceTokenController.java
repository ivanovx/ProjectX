package org.projectx.deviceservice.token;

import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreakerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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
        return tokenCircuitBreaker.run(webClient.get().uri("/tokens/" + deviceId).retrieve().bodyToMono(TokenResponse.class),
                throwable -> {
                    System.out.println(throwable.getMessage());

                    return Mono.just(null);
                });
    }

    @PostMapping("/{deviceId}/token")
    public Mono<TokenResponse> createDeviceToken(@PathVariable String deviceId) {
        return tokenCircuitBreaker.run(webClient.post().uri("/tokens/" + deviceId).retrieve().bodyToMono(TokenResponse.class),
                throwable -> {
                    System.out.println(throwable.getMessage());

                    return Mono.just(null);
                });
    }
}
