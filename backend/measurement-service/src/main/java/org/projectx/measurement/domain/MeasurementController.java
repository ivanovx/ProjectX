package org.projectx.measurement.domain;

import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/measurements")
public class MeasurementController {
    private StreamBridge streamBridge;

    public MeasurementController(StreamBridge streamBridge) {
        this.streamBridge = streamBridge;
    }


   /* private final MeasurementRepository measurementRepository;

    public MeasurementController(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }*/

    /*@GetMapping
    public ResponseEntity index() {
        List<Measurement> measurements = this.measurementRepository.findByKeyDevice("sample-device");

        return ResponseEntity.status(200).body(measurements);
    }*/

    @PostMapping
    public ResponseEntity putMeasurement(@RequestBody MeasurementRequest request) {
       // Measurement measurement = new Measurement();
      //  MeasurementKey key = new MeasurementKey(UUID.randomUUID(),"sample-device");

       // measurement.setKey(key);
       // measurement.setValue("10*C");

        //return ResponseEntity.status(201).body(measurementRepository.save(measurement));

        boolean isSend = streamBridge.send("measurements-topic", request.getDevice());

        return ResponseEntity.status(201).body(isSend);
    }
}