package org.projectx.measurement.domain;

import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface MeasurementRepository extends CassandraRepository<Measurement, UUID> {
}
