package org.projectx.device.domain;

import org.projectx.device.request.DeviceRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> getDevice(@PathVariable String id) {
        return this.deviceRepository.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Object> createDevice(@RequestBody DeviceRequest request) {
        /*return ReactiveSecurityContextHolder.getContext().map(user -> {


            Device device = new Device();

            device.setName(request.name());
            device.setOutdoor(request.outdoor());
            device.setSensors(request.sensors());
            device.setController(request.controller());
            device.setCoordinates(request.coordinates());
            device.setUserId(user.getAuthentication().getCredentials().toString());

            return this.deviceRepository.save(device);
        });*/

        return ReactiveSecurityContextHolder.getContext().map(user -> user.getAuthentication());
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> updateDevice(@PathVariable String id, @RequestBody DeviceRequest request) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return device;
    }

    @PostMapping("/activate/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> activateDevice(@PathVariable String id) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return device;
    }

    @PostMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Device> deleteDevice(@PathVariable String id) {
        Mono<Device> device = this.deviceRepository.findById(id);

        return device;
    }

  /*  private final DeviceRepository deviceRepository;

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

   // public Flux<Device> getAllUserDevices() {
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
