package org.sensornetwork.measurement.domain;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class MeasurementValue {
    private String temperature;

    private String airQuality;
}
