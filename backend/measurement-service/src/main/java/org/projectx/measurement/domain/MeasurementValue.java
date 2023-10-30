package org.projectx.measurement.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeasurementValue {
    private String temperature;

    private String airQuality;
}
