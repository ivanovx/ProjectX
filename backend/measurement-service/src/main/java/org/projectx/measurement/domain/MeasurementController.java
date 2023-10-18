package org.projectx.measurement.domain;

import java.util.UUID;
import java.time.LocalDateTime;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/measurements")
public class MeasurementController {
    private final MeasurementRepository measurementRepository;

    public MeasurementController(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @GetMapping("/{deviceId}")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Measurement> getMeasurements(@PathVariable String deviceId) {
        return this.measurementRepository.findByKeyDeviceId(deviceId);
    }

    @PutMapping("/{deviceId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Measurement> putMeasurement(@PathVariable String deviceId) {
        Measurement measurement = new Measurement();
        MeasurementKey key = new MeasurementKey(UUID.randomUUID(),deviceId);

        MeasurementValue value = MeasurementValue.builder().temperature("10.00").airQuality("10.00").build();

        measurement.setKey(key);
        measurement.setValue(value);
        measurement.setTimestamp(LocalDateTime.now());

        return this.measurementRepository.save(measurement);
    }
}