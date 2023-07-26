package org.projectx.service;

import java.util.List;
import java.time.LocalDateTime;

import org.projectx.repository.DeviceRepository;
import org.projectx.request.DeviceRequest;
import org.projectx.response.DeviceResponse;

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

    public ResponseEntity<List<Device>> getAll() {
        List<Device> response = this.deviceRepository.findAll();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<Device>> getAllActivated() {
        List<Device> response = this.deviceRepository
                .findAll()
                .stream()
                .filter(device -> device.getActivated() != null)
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<Device>> getAllByUser(String user) {
        List<Device> response = this.deviceRepository.findAllByUser(user);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<Device>> getAllByUser() {
        String user = this.getCurrentUser().getId();

        return this.getAllByUser(user);
    }

    public ResponseEntity<Device> getById(String id) {
        Device response = this.findById(id);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Device> create(DeviceRequest request) {
        Device device = new Device();

        device.setName(request.getName());
        device.setOutdoor(request.isOutdoor());
        device.setCoordinates(request.getCoordinates());

        device.setModified(null);
        device.setActivated(null);
        device.setCreated(LocalDateTime.now());

        device.setSensors(request.getSensors());
        device.setController(request.getController());
        device.setUser(this.getCurrentUser().getId());

        Device response = this.deviceRepository.save(device);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Device> activate(String id) {
        Device device = this.findById(id);

        this.checkUser(device, this.getCurrentUser());

        device.setActivated(LocalDateTime.now());

        Device response = this.deviceRepository.save(device);

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

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private void checkUser(Device device, User user) {
        if (device.getUser().compareTo(user.getId()) != 0) {
            throw new ApiRequestException("Device with is=%s not yours".formatted(device.getId()));
        }
    }

    private Device findById(String id) {
        return this.deviceRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("Device with id=%s not found".formatted(id)));
    }
}
