package org.projectx.measurement.domain;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MeasurementRepository extends CassandraRepository<Measurement, MeasurementKey> {
    List<Measurement> findByKeyDevice(String device);
}