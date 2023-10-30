package org.projectx.measurement.domain;

import reactor.core.publisher.Flux;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface MeasurementRepository extends ReactiveMongoRepository<Measurement, String> {
    Flux<Measurement> findByKeyDeviceId(String deviceId);
}