package org.sensornetwork.device.domain;

import java.util.List;

public record DeviceRequest(
        String name,
        String controller,
        List<String> sensors,
        DeviceLocation location,
        DeviceDescription description
) { }
