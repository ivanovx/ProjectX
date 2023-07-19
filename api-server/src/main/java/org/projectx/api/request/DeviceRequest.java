package org.projectx.api.request;

import lombok.Data;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.projectx.api.model.Coordinates;

@Data
@Valid
public class DeviceRequest {
    @NotBlank
    private String name;

    private boolean isOutdoor;

    @NotNull
    private Coordinates coordinates;
}
