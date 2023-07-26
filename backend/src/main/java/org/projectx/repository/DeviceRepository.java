package org.projectx.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import org.projectx.model.Device;

@Repository
public interface DeviceRepository extends MongoRepository<Device, String> {
    List<Device> findAll();

    List<Device> findAllByUser(String user);
}