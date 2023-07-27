package org.projectx.api.controller;

import org.projectx.api.model.Device;
import org.projectx.api.service.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    private final DeviceService deviceService;

    public HomeController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public List<Device> index() {
        return this.deviceService.getAllActivated();
    }

    @PostMapping
    public List<Device> post() {
        return this.deviceService.getAllActivated();
    }
}