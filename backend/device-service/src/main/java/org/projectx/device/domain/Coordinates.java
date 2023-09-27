package org.projectx.device.domain;

import lombok.Data;

@Data
public class Coordinates {
    private double latitude;

    private double longitude;

    public Coordinates(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}