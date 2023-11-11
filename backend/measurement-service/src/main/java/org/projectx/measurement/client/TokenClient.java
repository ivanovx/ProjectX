package org.projectx.measurement.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public interface TokenClient {

    @GetMapping("/tokens/{deviceId}")
    TokenResponse getToken(@PathVariable String deviceId);

    @PostMapping("/tokens/{deviceId}")
    TokenResponse createToken(@PathVariable String deviceId);
}
