package org.projectx.tokenservice.token;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Component
public class TokenHandler {
    private final TokenRepository tokenRepository;

    public TokenHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Mono<ServerResponse> getToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return tokenRepository.findByDeviceId(deviceId)
                .flatMap(token -> ServerResponse.ok().bodyValue(token));
                //.switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return tokenRepository.existsTokenByDeviceId(deviceId)
                .flatMap(exists -> {
                    if (exists) {
                        return ServerResponse.badRequest().bodyValue("Token for device %s already exist".formatted(deviceId));
                    }

                    Token token = Token.builder()
                            .deviceId(deviceId)
                            .value("token-" + deviceId)
                            .createdAt(LocalDateTime.now())
                            .expiredAt(LocalDateTime.now().plusYears(1))
                            .build();

                    return tokenRepository.save(token).flatMap(t -> ServerResponse.status(201).bodyValue(t));
                });
    }

    public Mono<ServerResponse> verifyToken(ServerRequest request) {
        return request.bodyToMono(VerifyRequest.class)
                .flatMap(body -> tokenRepository.findByDeviceId(body.deviceId()).flatMap(token -> {
                    if (LocalDateTime.now().isAfter(token.getExpiredAt())) {
                        return ServerResponse.badRequest().bodyValue("EXPIRED");
                    }

                    if (!token.getValue().equals(body.token())) {
                        return ServerResponse.badRequest().bodyValue("NOT_VALID");
                    }

                    return ServerResponse.ok().bodyValue("VALID");
                }));
               // .switchIfEmpty(ServerResponse.notFound().build());
    }
}
