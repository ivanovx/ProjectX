package org.sensornetwork.common.request;

import java.util.Optional;

public record MeasurementRequest(
         double temperature,
         double uvIndex,
         double vocIndex,
         double airQualityIndex
) { }
