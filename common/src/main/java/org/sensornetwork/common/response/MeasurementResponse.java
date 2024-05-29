package org.sensornetwork.common.response;

import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeasurementResponse {
    private String id;

    private String deviceId;

    private LocalDateTime timestamp;

    public MeasurementValue values;

    @Data
    private class MeasurementValue {
        private double temperature;

        private double uvIndex;

        private double vocIndex;

        private double airQualityIndex;

        private double windSpeed;

        private double windDirection;

        private double noise;
    }
}
