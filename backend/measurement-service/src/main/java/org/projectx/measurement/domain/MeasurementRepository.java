package org.projectx.measurement.domain;

import reactor.core.publisher.Flux;

import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;

public interface MeasurementRepository extends ReactiveCassandraRepository<Measurement, MeasurementKey> {
    Flux<Measurement> findByKeyDeviceId(String deviceId);
}