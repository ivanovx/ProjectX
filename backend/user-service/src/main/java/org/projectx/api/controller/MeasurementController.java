package org.projectx.api.controller;

import org.projectx.api.repository.DeviceRepository;
import org.projectx.api.repository.MeasurementRepository;
import org.projectx.api.model.Measurement;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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
    public List<Measurement> getMeasurements(@PathVariable String deviceId) {
        return this.measurementRepository.findAllByDevice(deviceId);
    }

    @PutMapping("/{deviceId}")
    public Measurement putMeasurement(@PathVariable String deviceId, @RequestBody Measurement measurement, @RequestHeader("X-API-KEY") String apiToken) {
        if (!this.deviceRepository.existsById(deviceId)){
            throw new RuntimeException("Device with id=%s dont exist".formatted(deviceId));
        }

        if (apiToken != "fake-api-key") {
            throw new RuntimeException("API key is not valid");
        }

        measurement.setDevice(deviceId);
        measurement.setTimestamp(LocalDateTime.now());

        return this.measurementRepository.save(measurement);
    }
}