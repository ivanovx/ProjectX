package org.sensornetwork.common.request;

public record TokenVerifyRequest(String token, String deviceId) { }