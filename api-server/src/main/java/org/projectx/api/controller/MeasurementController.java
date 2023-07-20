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

   /* @PutMapping("/{deviceId}")
    public Measurement putMeasurement(@PathVariable String deviceId, @RequestBody Measurement measurement, @RequestHeader("X-API-KEY") String apiToken) {
        if (!this.deviceRepository.existsById(deviceId)){
            throw new ApiRequestException("Device with id=%s dont exist".formatted(deviceId));
        }

        if (apiToken != ApiKeyGenerator.generate()) {
            throw new ApiRequestException("Api key is not valid");
        }

        // TODO
        // check token

        measurement.setDeviceId(deviceId);
        measurement.setTimestamp(LocalDateTime.now());

        return this.measurementRepository.save(measurement);
    }*/
}