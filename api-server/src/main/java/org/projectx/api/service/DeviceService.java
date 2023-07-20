package org.projectx.api.service;

import java.util.List;
import java.time.LocalDateTime;

import org.projectx.api.repository.DeviceRepository;
import org.projectx.api.request.DeviceRequest;
import org.projectx.api.response.DeviceResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import org.projectx.api.model.Device;

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
                .findAllByUser(userId)
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

    public Device create(DeviceRequest request) {
        Device device = new Device();

        device.setUser(this.getCurrentUser().getSubject());
        device.setCoordinates(request.getCoordinates());
        device.setName(request.getName());
        device.setCreatedOn(LocalDateTime.now());
        device.setActivated(false);
        device.setActivatedOn(null);
        device.setUpdatedOn(null);

       // device.setCreated(LocalDateTime.now());
        //device.setActivated(false);
        //device.setUser(this.getCurrentUser().getSubject());

       // device.setOutdoor(request.isOutdoor());
        //device.setName(request.getName());
       // device.setCoordinates(request.getCoordinates());

        DeviceResponse response = DeviceResponse.of(device);

        return device; //ResponseEntity.ok(response);
    }

    public ResponseEntity<DeviceResponse> update(String id, DeviceRequest request) {
        Device device = this.findById(id);

        //this.checkUser(device, this.getCurrentUser());

        device.setName(request.getName());
       // device.setOutdoor(request.isOutdoor());
        //device.setCoordinates(request.getCoordinates());

       // device.setModified(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    public ResponseEntity delete(String id) {
        Device device = this.findById(id);

        //this.checkUser(device, this.getCurrentUser());

        this.deviceRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<DeviceResponse> activate(String id) {
        Device device = this.findById(id);

       // this.checkUser(device, this.getCurrentUser());

        device.setActivated(true);
        //device.setActivated(LocalDateTime.now());

        DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return ResponseEntity.ok(response);
    }

    private Jwt getCurrentUser() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Todo check owner
   /* private void checkUser(Device device, User user) {
        if (device.getUser().getId().compareTo(user.getId()) != 0) {
            throw new ApiRequestException("Device with is=%s not yours".formatted(device.getId()));
        }
    }*/

    private Device findById(String id) {
        return this.deviceRepository
                .findById(id)
                .orElseThrow(/*() -> new ApiRequestException("Device with id=%s not found".formatted(id))*/);
    }
}
