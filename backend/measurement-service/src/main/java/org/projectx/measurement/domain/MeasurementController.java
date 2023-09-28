package org.projectx.measurement.domain;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/measurements")
public class MeasurementController {
    private final MeasurementRepository measurementRepository;

    public MeasurementController(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @GetMapping
    public ResponseEntity index() {
        List<Measurement> measurements = this.measurementRepository.findAll();

        return ResponseEntity.status(200).body(measurements);
    }

    @PostMapping
    public ResponseEntity create() {
        Measurement measurement = new Measurement();

        measurement.setId(UUID.randomUUID());
        measurement.setDevice("sample-device");
        measurement.setValue("10*C");

        return ResponseEntity.status(201).body(measurementRepository.save(measurement));
    }
}