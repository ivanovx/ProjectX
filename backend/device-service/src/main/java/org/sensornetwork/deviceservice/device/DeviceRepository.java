package org.sensornetwork.deviceservice.device;

import reactor.core.publisher.Flux;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface DeviceRepository extends ReactiveMongoRepository<Device, String> {
    Flux<Device> findAllByUserId(String userId);
}