package org.sensornetwork.device.handler;

import com.netflix.discovery.EurekaClient;
import org.sensornetwork.common.response.TokenResponse;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.ReactiveCircuitBreakerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class TokenHandler {
    private final WebClient webClient;
    private final EurekaClient eurekaClient;
    private final ReactiveCircuitBreaker tokenCircuitBreaker;

    public TokenHandler(EurekaClient eurekaClient, ReactiveCircuitBreakerFactory circuitBreakerFactory) {
        this.eurekaClient = eurekaClient;
        this.tokenCircuitBreaker = circuitBreakerFactory.create("tokens");

        String baseUrl = eurekaClient.getNextServerFromEureka("token-service", false).getHomePageUrl();

        this.webClient = WebClient
                .builder()
                .baseUrl(baseUrl)
                .build();
    }

    public Mono<ServerResponse> getDeviceToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        Mono<TokenResponse> getDeviceToken = webClient.get()
                .uri("/tokens/" + deviceId)
                .retrieve()
                .bodyToMono(TokenResponse.class);

       // return tokenCircuitBreaker.run(response); //, throwable -> ServerResponse.ok().bodyValue(null)); //.bodyValue(throwable.getMessage()));
        return tokenCircuitBreaker.run(ServerResponse.ok().body(getDeviceToken, TokenResponse.class));
                //throwable -> ServerResponse.ok().bodyValue(null));
    }

    public Mono<ServerResponse> createDeviceToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        Mono<TokenResponse> postDeviceToken = webClient.post()
                .uri("/tokens/" + deviceId)
                .retrieve()
                .bodyToMono(TokenResponse.class);

        return tokenCircuitBreaker.run(ServerResponse.status(201).body(postDeviceToken, TokenResponse.class));
        //throwable -> ServerResponse.badRequest().bodyValue(throwable.getMessage()));
    }
}
