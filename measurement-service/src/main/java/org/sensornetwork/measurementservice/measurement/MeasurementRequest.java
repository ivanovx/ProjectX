package org.sensornetwork.measurementservice.measurement;

import java.util.Optional;

public record MeasurementRequest(
        Optional<Float> temperature,
        Optional<Float> airIndex,
        Optional<Float> windSpeed,
        Optional<Float> uvIndex,
        Optional<Float> noise
) { }
