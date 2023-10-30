package org.projectx.measurement.domain;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

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
        return this.measurementRepository.findByDeviceId(deviceId);
    }

    @PutMapping("/{deviceId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Measurement> putMeasurement(@PathVariable String deviceId) {
        Measurement measurement = new Measurement();

        MeasurementValue value = MeasurementValue
                .builder()
                .temperature("10.00")
                .airQuality("10.00")
                .build();

        measurement.setValue(value);
        measurement.setDeviceId(deviceId);

        return this.measurementRepository.save(measurement);
    }
}