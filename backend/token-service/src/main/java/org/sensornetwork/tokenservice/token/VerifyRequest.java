package org.sensornetwork.tokenservice.token;

public record VerifyRequest(String token, String deviceId) { }
