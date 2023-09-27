package org.projectx.device.domain;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.security.Principal;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final DeviceService deviceService;

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
    }
}
