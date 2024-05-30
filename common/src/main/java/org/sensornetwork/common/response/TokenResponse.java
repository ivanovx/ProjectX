package org.sensornetwork.common.response;

import java.time.LocalDateTime;

public record TokenResponse(
        String value,
        String deviceId,

        String id,

        LocalDateTime createdAt,

        LocalDateTime expiredAt
) { }