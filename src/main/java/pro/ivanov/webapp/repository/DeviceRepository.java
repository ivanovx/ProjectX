package pro.ivanov.webapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pro.ivanov.webapp.entity.Device;

import java.util.List;
import java.util.UUID;

@Repository
public interface DeviceRepository extends CrudRepository<Device, UUID> {
    List<Device> findAll();
}