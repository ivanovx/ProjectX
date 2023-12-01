package org.projectx.measurement.domain;

import java.util.Optional;

public record MeasurementRequest(
        Optional<Float> temperature,
        Optional<Float> airIndex,
        Optional<Float> windSpeed,
        Optional<Float> uvIndex,
        Optional<Float> noise
) { }
