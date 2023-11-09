package org.projectx.device.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeviceCoordinates {
    private double latitude;

    private double longitude;
}
