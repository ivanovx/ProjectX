package org.projectx.device.domain;

import lombok.Data;

@Data
public class DeviceRequest {
    private String name;

    private String[] sensors;

    private String controller;

    private boolean outdoor;

    private Coordinates coordinates;
}
