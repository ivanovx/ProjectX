package org.projectx.measurement.domain;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("measurements")
public class Measurement {
    @Id
    private String id;

    private String deviceId;

    private MeasurementValue value;

    private LocalDateTime timestamp = LocalDateTime.now();
}
