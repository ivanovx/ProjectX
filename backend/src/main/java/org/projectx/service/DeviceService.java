package org.projectx.service;

import java.util.List;
import java.time.LocalDateTime;

import org.projectx.repository.DeviceRepository;
import org.projectx.requestModel.DeviceRequest;
import org.projectx.responseModel.DeviceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.projectx.ApiRequestException;
import org.projectx.model.Device;
import org.projectx.model.User;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public ResponseEntity<List<DeviceResponse>> getAll() {
        List<DeviceResponse> response = this.deviceRepository
                .findAll()
                .stream()
                .map(device -> DeviceResponse.of(device))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<DeviceResponse>> getAllActivated() {
        List<DeviceResponse> response = this.deviceRepository
                .findAll()
                .stream()
                .filter(device -> device.isActivated())
                .map(device -> DeviceResponse.of(device))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<DeviceResponse>> getAllByUserId(String userId) {
        List<DeviceResponse> response = this.deviceRepository
                .findAllByUserId(userId)
                .stream()
                .map(device -> DeviceResponse.of(device))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<DeviceResponse>> getAllByUser() {
        return this.getAllByUserId(this.getCurrentUser().getId());
    }

    public ResponseEntity<DeviceResponse> getById(String id) {
        Device device = this.findById(id);
        DeviceResponse response = DeviceResponse.of(device);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<DeviceResponse> create(DeviceRequest request) {
        Device device = new Device();

        device.setCreated(LocalDateTime.now());
        device.setActivated(false);
        device.setUser(this.getCurrentUser());

        device.setOutdoor(request.isOutdoor());
        device.setName(request.getName());
        device.setCoordinates(request.getCoordinates());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<DeviceResponse> update(String id, DeviceRequest request) {
        Device device = this.findById(id);

        this.checkUser(device, this.getCurrentUser());

        device.setName(request.getName());
        device.setOutdoor(request.isOutdoor());
        device.setCoordinates(request.getCoordinates());

        device.setModified(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    public ResponseEntity delete(String id) {
        Device device = this.findById(id);

        this.checkUser(device, this.getCurrentUser());

        this.deviceRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<DeviceResponse> activate(String id) {
        Device device = this.findById(id);

        this.checkUser(device, this.getCurrentUser());

        device.setActivated(true);
        //device.setActivated(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Todo check owner
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
