package pro.ivanov.webapp.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pro.ivanov.webapp.ApiRequestException;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.model.User;
import pro.ivanov.webapp.repository.DeviceRepository;
import pro.ivanov.webapp.requestModel.DeviceRequest;
import pro.ivanov.webapp.responseModel.DeviceResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public ResponseEntity<?> getAllActivated() {
        List<DeviceResponse> response = this.deviceRepository
                .findAll()
                .stream()
                .filter(device -> device.isActivated())
                .map(device -> DeviceResponse.of(device))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAllByUser(String userId) {
        List<DeviceResponse> response = this.deviceRepository
                .findAllByUserId(userId)
                .stream()
                .map(device -> DeviceResponse.of(device))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getById(String id) {
        Device device = this.findById(id);
        DeviceResponse response = DeviceResponse.of(device);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> create(DeviceRequest request, User user) {
        Device device = new Device();

        device.setCreatedOn(LocalDateTime.now());
        device.setActivated(false);
        device.setUser(user);

        device.setOutdoor(request.isOutdoor());
        device.setName(request.getName());
        device.setCoordinates(request.getCoordinates());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> update(String id, DeviceRequest request, User user) {
        Device device = this.findById(id);

        this.checkUser(device, user);

        device.setName(request.getName());
        device.setOutdoor(request.isOutdoor());
        device.setCoordinates(request.getCoordinates());

        device.setUpdatedOn(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    public void delete(String id, User user) {
        Device device = this.findById(id);

        this.checkUser(device, user);

        this.deviceRepository.deleteById(id);
    }

    public ResponseEntity<?> activate(String id, User user) {
        Device device = this.findById(id);

        this.checkUser(device, user);

        device.setActivated(true);
        device.setActivatedOn(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    private void checkUser(Device device, User user) {
        if (device.getUser().getId().compareTo(user.getId()) != 0) {
            throw new ApiRequestException("Device with is=%s not yours".formatted(device.getId()));
        }
    }

    private Device findById(String id) {
        return this.deviceRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("Device with id=%s not found".formatted(id)));
    }
}
