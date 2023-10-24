package org.projectx.device.request;

import org.projectx.device.domain.Coordinates;

public record DeviceRequest(
        String name,
        String[] sensors,
        String controller,
        boolean outdoor,
        Coordinates coordinates
) { }
