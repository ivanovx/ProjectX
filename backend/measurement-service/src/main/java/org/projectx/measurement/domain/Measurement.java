package org.projectx.measurement.domain;

import lombok.Data;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.time.LocalDateTime;

@Data
@Table("measurements")
public class Measurement {
    @PrimaryKey
    private MeasurementKey key;

    @Column
    private MeasurementValue value;

    @Column
    @CassandraType(type= CassandraType.Name.TIMESTAMP)
    private LocalDateTime timestamp;
}
