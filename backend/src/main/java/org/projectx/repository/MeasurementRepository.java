package org.projectx.repository;

import org.projectx.model.Measurement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends MongoRepository<Measurement, String> {
    List<Measurement> findAllByDevice(String device);
}
