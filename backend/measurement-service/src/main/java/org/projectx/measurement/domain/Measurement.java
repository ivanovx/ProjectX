package org.projectx.measurement.domain;

import lombok.Data;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.util.UUID;

@Data
@Table("measurements")
public class Measurement {
    @PrimaryKey
    private UUID id;

    @Column
    private String device;

    @Column
    private String value;
}
