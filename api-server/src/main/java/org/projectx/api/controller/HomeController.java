package org.projectx.api.controller;

import org.projectx.api.response.DeviceResponse;
import org.projectx.api.service.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<List<DeviceResponse>> index() {
        return this.deviceService.getAllActivated();
    }
}