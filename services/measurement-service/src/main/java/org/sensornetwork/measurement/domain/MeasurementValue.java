package org.sensornetwork.measurement.domain;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class MeasurementValue {
    private double temperature;

    private double uvIndex;

    private double vocIndex;

    private double airQualityIndex;

    private double windSpeed;

    private double windDirection;

    private double noise;
}
