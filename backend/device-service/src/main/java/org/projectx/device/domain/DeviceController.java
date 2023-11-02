package org.projectx.device.domain;

import org.projectx.device.request.DeviceRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Device> getAllDevices() {
        return this.deviceRepository.findAll();
    }

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Device> getAllUserDevices(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getClaimAsString("userId");

        return this.deviceRepository.findAllByUserId(userId);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> getDevice(@PathVariable String id) {
        return this.deviceRepository.findById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Device> createDevice(@AuthenticationPrincipal Jwt jwt, @RequestBody DeviceRequest request) {
        String userId = jwt.getClaimAsString("userId");

        Device device = new Device();

        device.setUserId(userId);
        device.setName(request.name());
        device.setOutdoor(request.outdoor());
        device.setSensors(request.sensors());
        device.setController(request.controller());
        device.setCoordinates(request.coordinates());

        return this.deviceRepository.save(device);
    }

    @PostMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> updateDevice(@PathVariable String id, @AuthenticationPrincipal Jwt jwt, @RequestBody DeviceRequest request) {
        String userId = jwt.getClaimAsString("userId");

        return this.deviceRepository
                .findById(id)
                .map(device -> {
                    device.setUserId(userId);
                    device.setName(request.name());
                    device.setOutdoor(request.outdoor());
                    device.setSensors(request.sensors());
                    device.setController(request.controller());
                    device.setCoordinates(request.coordinates());
                    device.setModified(LocalDateTime.now());

                    return device;
                })
                .flatMap(deviceRepository::save);
    }

    @PostMapping("/activate/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> activateDevice(@PathVariable String id) {
        return this.deviceRepository
                .findById(id)
                .map(device -> {
                    device.setActivated(LocalDateTime.now());

                    return device;
                })
                .flatMap(deviceRepository::save);
    }

    @PostMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> deleteDevice(@PathVariable String id) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return device;
    }
}
