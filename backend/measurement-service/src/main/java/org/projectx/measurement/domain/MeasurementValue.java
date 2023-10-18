package org.projectx.measurement.domain;

import lombok.Builder;
import lombok.Data;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@Data
@Builder
@UserDefinedType("measurement_value")
public class MeasurementValue {
    @Column
    private String temperature;

    @Column
    private String airQuality;
}
