package org.projectx.request;

import lombok.Data;

import org.projectx.model.Coordinates;

@Data
public class DeviceRequest {
    private String name;

    private String controller;

    private String[] sensors;

    private boolean outdoor;

    private Coordinates coordinates;
}
