package org.projectx.requestModel;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.projectx.model.Coordinates;

@Data
@Valid
public class DeviceRequest {
    @NotBlank
    private String name;

    private boolean isOutdoor;

    @NotNull
    private Coordinates coordinates;
}
