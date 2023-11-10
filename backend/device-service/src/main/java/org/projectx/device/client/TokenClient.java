package org.projectx.device.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import reactor.core.publisher.Mono;

@FeignClient("token")
public interface TokenClient {

    @GetMapping("/tokens/{deviceId}")
    Mono<TokenResponse> getToken(@PathVariable String deviceId);

    @PostMapping("/tokens/{deviceId}")
    Mono<TokenResponse> createToken(@PathVariable String deviceId);
}
