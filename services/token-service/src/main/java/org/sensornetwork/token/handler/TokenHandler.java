package org.sensornetwork.token.handler;

import java.time.LocalDateTime;
import reactor.core.publisher.Mono;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import org.sensornetwork.common.TokenGenerator;
import org.sensornetwork.common.request.TokenVerifyRequest;

import org.sensornetwork.token.domain.Token;
import org.sensornetwork.token.domain.TokenRepository;

@Component
public class TokenHandler {
    private final TokenRepository tokenRepository;

    public TokenHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Mono<ServerResponse> getDeviceToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return tokenRepository.findByDeviceId(deviceId).flatMap(token -> ServerResponse.ok().bodyValue(token))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createDeviceToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return tokenRepository.existsByDeviceId(deviceId).flatMap(exists -> {
            if (exists) {
                return ServerResponse.badRequest().bodyValue("Token already exists");
            }

            Token deviceToken = Token.builder()
                    .deviceId(deviceId)
                    .value(TokenGenerator.generateApiKey())
                    .createdAt(LocalDateTime.now())
                    .expiredAt(LocalDateTime.now().plusYears(1))
                    .build();

            return tokenRepository.save(deviceToken).flatMap(token -> ServerResponse.status(201).bodyValue(token));
        });

        /**/

        //return tokenRepository.existsByDeviceId(deviceId)(exists -> {
        //    if (exists) {
         //       return tokenRepository.deleteByDeviceId(deviceId).flatMap(res -> {
         //           return tokenRepository.save(deviceToken).flatMap(token -> ServerResponse.status(201).bodyValue(token));
             //   });
          //  }

          //  return tokenRepository.save(deviceToken).flatMap(token -> ServerResponse.status(201).bodyValue(token));
       // });

      //  return tokenRepository.existsByDeviceId(deviceId).map(exists -> {
        //    if (exists) {
          //      return tokenRepository.deleteByDeviceId(deviceId).flatMap(r -> Mono.just(deviceToken));
          //  }

         //   return Mono.just(deviceToken);
        //}).flatMap(t -> {
          //  return tokenRepository.save(deviceToken).flatMap(token -> ServerResponse.status(201).bodyValue(token));
        //});
    }

    public Mono<ServerResponse> deleteDeviceToken(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return tokenRepository.existsByDeviceId(deviceId).flatMap(exists -> {
            if (exists) {
                return tokenRepository.deleteByDeviceId(deviceId).then(Mono.defer(() -> ServerResponse.ok().build()));
            }

            return ServerResponse.notFound().build();
        });
    }

    // Here use rabbitmq
    /*public Mono<ServerResponse> verifyToken(ServerRequest request) {
        return request.bodyToMono(TokenVerifyRequest.class)
                .flatMap(body -> tokenRepository.findByDeviceId(body.deviceId()).flatMap(token -> {
                    if (LocalDateTime.now().isAfter(token.getExpiredAt())) {
                        return ServerResponse.badRequest().bodyValue("EXPIRED");
                    }

                    if (!token.getValue().equals(body.token())) {
                        return ServerResponse.badRequest().bodyValue("NOT_VALID");
                    }

                    return ServerResponse.ok().bodyValue("VALID");
                }));
    }*/
}
