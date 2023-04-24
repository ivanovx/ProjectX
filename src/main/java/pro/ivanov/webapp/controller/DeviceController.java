package pro.ivanov.webapp.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pro.ivanov.webapp.entity.Coordinates;
import pro.ivanov.webapp.entity.Device;
import pro.ivanov.webapp.repository.DeviceRepository;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public List<Device> allDevices() {
        return this.deviceRepository.findAll();
    }

    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        device.setId(UUID.randomUUID());

        return this.deviceRepository.save(device);
    }
    
    @PostMapping("/{id}")
    public Device activateDevice(@PathVariable String id) {
        Device device = this.deviceRepository.findById(UUID.fromString(id)).orElseThrow();

        device.setActive(true);

        return device;

    }
}