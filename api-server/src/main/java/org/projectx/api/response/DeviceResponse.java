package org.projectx.api.response;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Builder;

import org.projectx.api.model.Coordinates;
import org.projectx.api.model.Device;

@Data
@Builder
public class DeviceResponse {

    public static DeviceResponse of(Device device) {
        DeviceResponse response = DeviceResponse
                .builder()
                .build();

        return response;
    }
}