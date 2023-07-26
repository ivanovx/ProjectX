package org.projectx.controller;

import org.projectx.ApiKeyGenerator;
import org.projectx.ApiRequestException;
import org.projectx.model.Measurement;
import org.projectx.repository.DeviceRepository;
import org.projectx.repository.MeasurementRepository;
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

    @GetMapping("/{device}")
    public List<Measurement> getMeasurements(@PathVariable String device) {
        return this.measurementRepository.findAllByDevice(device);
    }

    @PutMapping("/{device}")
    public Measurement putMeasurement(@PathVariable String device, @RequestBody Measurement measurement, @RequestHeader("X-API-KEY") String apiToken) {
        if (!this.deviceRepository.existsById(device)){
            throw new ApiRequestException("Device with id=%s dont exist".formatted(device));
        }

        if (apiToken != ApiKeyGenerator.generate()) {
            throw new ApiRequestException("Api key is not valid");
        }

        measurement.setDevice(device);
        measurement.setTimestamp(LocalDateTime.now());

        return this.measurementRepository.save(measurement);
    }
}