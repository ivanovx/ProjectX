package org.projectx.device.domain;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.security.Principal;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Flux<Device> getAllDevices() {
        return this.deviceRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Device> createDevice(@RequestBody Device device) {
        return this.deviceRepository.save(device);
    }

    @GetMapping("/{deviceId}")
    public Mono<Device> getDevice(@PathVariable String deviceId) {
        return this.deviceRepository.findById(new ObjectId(deviceId));
    }

    public Flux<Device> getAllUserDevices() {
        return this.deviceRepository.findAllByUser(new ObjectId(""));
    }

  /*  private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public List<Device> allDevices(Principal principal) {
        return this.deviceService.getAll();
    }

    @PostMapping("/create")
    public Device createDevice(@RequestBody DeviceRequest request) {
        return this.deviceService.create(request);
    }

    @GetMapping("/device/{id}")
    public Device getDevice(@PathVariable String id) {
        return this.deviceService.getById(id);
    }

    @PostMapping("/update/{id}")
    public Device updateDevice(@PathVariable String id, @RequestBody DeviceRequest request) {
        return this.deviceService.update(id, request);
    }

    @PostMapping("/activate/{id}")
    public Device activateDevice(@PathVariable String id) {
        return this.deviceService.activate(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteDevice(@PathVariable String id) {
        return this.deviceService.delete(id);
    }*/
}
