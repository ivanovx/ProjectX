package org.sensornetwork.measurement.domain;

import reactor.core.publisher.Flux;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import java.time.LocalDateTime;

public interface MeasurementRepository extends ReactiveMongoRepository<Measurement, String> {
    Flux<Measurement> findByDeviceIdOrderByTimestampDesc(String deviceId);

    Flux<Measurement> findAllByDeviceIdAndTimestampBetween(String deviceId, LocalDateTime from, LocalDateTime to);
}