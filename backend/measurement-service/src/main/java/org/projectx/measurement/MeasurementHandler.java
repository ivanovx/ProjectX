package org.projectx.measurement;

import org.projectx.measurement.domain.Measurement;
import org.projectx.measurement.domain.MeasurementRepository;
import org.projectx.measurement.domain.MeasurementValue;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class MeasurementHandler {
    private final MeasurementRepository measurementRepository;

    public MeasurementHandler(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    public Mono<ServerResponse> getMeasurements(ServerRequest request) {
        String deviceId = request.pathVariable("id");
        Flux<Measurement> measurements = measurementRepository.findByDeviceId(deviceId);

        return ServerResponse.ok().body(measurements, Measurement.class);
    }

    public Mono<ServerResponse> putMeasurement(ServerRequest request) {
        String deviceId = request.pathVariable("id");
        String apiKey = request.headers().firstHeader("X-API-KEY");
        String apiSecret = request.headers().firstHeader("X-API-SECRET");

        if (apiKey == null && apiSecret == null) {
            return ServerResponse.status(401).build();
        }

        Measurement measurement = new Measurement();

        MeasurementValue value = MeasurementValue
                .builder()
                .temperature("10.00")
                .airQuality("10.00")
                .build();

        measurement.setValue(value);
        measurement.setDeviceId(deviceId);

        return measurementRepository.save(measurement).flatMap(m -> ServerResponse.status(201).body(Mono.just(m), Measurement.class));
    }
}
