package pro.ivanov.webapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pro.ivanov.webapp.model.Device;

import java.util.List;

@Repository
public interface DeviceRepository extends MongoRepository<Device, String> {
    List<Device> findAll();

    List<Device> findAllByUserId(String userId);
}