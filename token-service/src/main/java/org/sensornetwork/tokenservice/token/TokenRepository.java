package org.sensornetwork.tokenservice.token;

import reactor.core.publisher.Mono;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TokenRepository extends ReactiveMongoRepository<Token, String> {

    Mono<Boolean> existsTokenByDeviceId(String deviceId);

    Mono<Token> findByDeviceId(String deviceId);
}
