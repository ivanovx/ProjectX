package org.projectx.device.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceRepository extends MongoRepository<Device, String> {
    List<Device> findAll();

    List<Device> findAllByUser(String user);
}