package org.projectx.measurement.domain;

import lombok.Data;

import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

@Data
@Table("measurements")
public class Measurement {
    @PrimaryKey
    private MeasurementKey key;

    @Column
    private String value;
}
