package org.sensornetwork.token.domain;

import reactor.core.publisher.Mono;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TokenRepository extends ReactiveMongoRepository<Token, String> {
    Mono<Token> findByDeviceId(String deviceId);

    Mono<Boolean> existsByDeviceId(String deviceId);

    Mono<Void> deleteByDeviceId(String deviceId);
}