package org.projectx.token;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/tokens")
public class TokenController {
    private final TokenRepository tokenRepository;

    public TokenController(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/{deviceId}")
    public Mono<Token> getToken(@PathVariable String deviceId) {
        return tokenRepository.findByDeviceId(deviceId);
    }

    @PostMapping("/{deviceId}")
    public Mono<Token> createToken(@PathVariable String deviceId) {
        Token token = Token.builder()
                .deviceId(deviceId)
                .value("token-" + deviceId)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusYears(1))
                .build();

        return tokenRepository.save(token);
    }
}
