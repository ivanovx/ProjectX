package org.projectx.tokenservice.token;

public record VerifyRequest(String token, String deviceId) { }
