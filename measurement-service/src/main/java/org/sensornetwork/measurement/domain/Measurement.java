package org.sensornetwork.measurement.domain;

import lombok.Data;

import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("measurements")
public class Measurement {
    @Id
    private String id;

    private String deviceId;

    private LocalDateTime timestamp = LocalDateTime.now();

    public Map<String, Object> body;
}
