package org.sensornetwork.device.domain;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeviceLocation {
    private double latitude;

    private double longitude;

    private String city;

    private String street;
}
