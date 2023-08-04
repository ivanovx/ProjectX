package org.projectx.api.repository;

import java.util.List;

import org.projectx.api.model.Device;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DeviceRepository extends MongoRepository<Device, String> {
    List<Device> findAll();

    List<Device> findAllByUser(String user);
}