package org.projectx.deviceservice.device;

import java.time.LocalDateTime;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
        device.setSensors(request.sensors());
        device.setTimestamp(LocalDateTime.now());
        device.setController(request.controller());
        device.setLocation(request.location());
        device.setDescription(request.description());

        return this.deviceRepository.save(device);
    }

 /*   @PostMapping("/update/{id}")
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
    public Mono<org.projectx.deviceservice.domain.Device> activateDevice(@PathVariable String id) {
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
    public Mono<org.projectx.deviceservice.domain.Device> deleteDevice(@PathVariable String id) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return device;
    }*/
}
