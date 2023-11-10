package org.projectx.device.domain;

import feign.Feign;
import org.projectx.device.client.TokenClient;
import org.projectx.device.client.TokenResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/devices")
public class DeviceTokenController {
    private final TokenClient tokenClient;

    public DeviceTokenController(TokenClient tokenClient) {
        this.tokenClient = tokenClient;
    }

    @GetMapping("/{deviceId}/token")
    public Mono<TokenResponse> getDeviceToken(@PathVariable String deviceId) {
        return this.tokenClient.getToken(deviceId);
    }

    @PostMapping("/{deviceId}/token")
    public Mono<TokenResponse> createDeviceToken(@PathVariable String deviceId) {
        return this.tokenClient.createToken(deviceId);
    }
}
