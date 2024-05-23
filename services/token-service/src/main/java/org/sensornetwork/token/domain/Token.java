package org.sensornetwork.token.domain;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Builder;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("tokens")
public class Token {
    @Id
    private String id;

    private String deviceId;

    private String value;

    private LocalDateTime createdAt;

    private LocalDateTime expiredAt;
}
