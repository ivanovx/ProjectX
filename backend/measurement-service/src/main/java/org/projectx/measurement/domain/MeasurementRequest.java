package org.projectx.measurement.domain;

import lombok.Data;

@Data
public class MeasurementRequest {
    private String device;

    private String value;
}
