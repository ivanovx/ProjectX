package org.projectx.token;

import reactor.core.publisher.Mono;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TokenRepository extends ReactiveMongoRepository<Token, String> {
    Mono<Token> findByDeviceId(String deviceId);
}
