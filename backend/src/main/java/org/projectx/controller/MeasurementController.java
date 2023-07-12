package org.projectx.controller;

import org.projectx.ApiRequestException;
import org.projectx.model.Measurement;
import org.projectx.repository.DeviceRepository;
import org.projectx.repository.MeasurementRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/measurements")
public class MeasurementController {
    private final MeasurementRepository measurementRepository;

    private final DeviceRepository deviceRepository;

    public MeasurementController(MeasurementRepository measurementRepository, DeviceRepository deviceRepository) {
        this.measurementRepository = measurementRepository;
        this.deviceRepository = deviceRepository;
    }

    @GetMapping("/{deviceId}")
    public String getMeasurements(@PathVariable String deviceId) {
        return "measurements-from-" + deviceId;
    }

    @PutMapping("/{deviceId}")
    public Measurement putMeasurement(@PathVariable String deviceId, @RequestBody Measurement measurement, @RequestHeader("X-API-KEY") String apiToken) {
        if (!this.deviceRepository.existsById(deviceId)){
            throw new ApiRequestException("Device with id=%s dont exist".formatted(deviceId));
        }

        // TODO
        // check token

        return this.measurementRepository.save(measurement);
    }
}