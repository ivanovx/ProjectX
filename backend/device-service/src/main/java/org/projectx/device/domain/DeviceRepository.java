package org.projectx.device.domain;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface DeviceRepository extends ReactiveMongoRepository<Device, ObjectId> {
   /* List<Device> findAll();

    List<Device> findAllByUser(String user);*/

    Flux<Device> findAllByUser(ObjectId user);
}