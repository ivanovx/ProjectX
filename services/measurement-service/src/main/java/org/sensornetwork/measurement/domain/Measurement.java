package org.sensornetwork.measurement.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("measurements")
public class Measurement {
    @Id
    private String id;

    private String deviceId;

    private LocalDateTime timestamp;

    public MeasurementValue values;
}
