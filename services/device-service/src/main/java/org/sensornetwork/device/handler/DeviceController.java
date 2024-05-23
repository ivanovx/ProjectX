package org.sensornetwork.device.handler;

import java.time.LocalDateTime;

import org.sensornetwork.device.domain.Device;
import org.sensornetwork.device.domain.DeviceRepository;
import org.sensornetwork.device.domain.DeviceRequest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public class DeviceController {
    private final DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    public Flux<Device> getAllDevices() {
        return this.deviceRepository.findAll();
    }


    public Flux<Device> getAllUserDevices(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getClaimAsString("userId");

        return this.deviceRepository.findAllByUserId(userId);
    }

    public Mono<Device> getDevice(@PathVariable String id) {
        return this.deviceRepository.findById(id);
    }

    public Mono<Device> createDevice(@AuthenticationPrincipal Jwt jwt, @RequestBody DeviceRequest request) {
        String userId = jwt.getClaimAsString("userId");

        Device device = new Device();

        device.setUserId(userId);
        device.setName(request.name());
        device.setSensors(request.sensors());
        device.setTimestamp(LocalDateTime.now());
        device.setController(request.controller());
        device.setLocation(request.location());
        device.setDescription(request.description());

        return this.deviceRepository.save(device);
    }

    public Mono<Device> updateDevice(@PathVariable String id, @AuthenticationPrincipal Jwt jwt, @RequestBody DeviceRequest request) {
        String userId = jwt.getClaimAsString("userId");

        return deviceRepository.findById(id).map(device -> {
            device.setName(request.name());
            device.setSensors(request.sensors());
            device.setController(request.controller());
            device.setLocation(request.location());
            device.setDescription(request.description());

            return device;
        }).flatMap(deviceRepository::save);
    }

    public Mono<Void> deleteDevice(@PathVariable String id, @AuthenticationPrincipal Jwt jwt) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return deviceRepository.deleteById(id);
    }
}
