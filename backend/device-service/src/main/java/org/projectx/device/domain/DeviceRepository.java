package org.projectx.device.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface DeviceRepository extends ReactiveMongoRepository<Device, String> {
    Flux<Device> findByUserId(String userId);
}