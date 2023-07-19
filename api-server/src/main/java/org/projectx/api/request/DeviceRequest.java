package org.projectx.api.request;

import lombok.Data;

import org.projectx.api.model.Coordinates;

@Data
public class DeviceRequest {
    private String name;

    private Coordinates coordinates;
}
