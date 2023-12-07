package org.sensornetwork.measurementservice.measurement;

import lombok.Data;

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
}
