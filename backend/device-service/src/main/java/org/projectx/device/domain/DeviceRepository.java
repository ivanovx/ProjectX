package org.projectx.device.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface DeviceRepository extends ReactiveMongoRepository<Device, String> {

}