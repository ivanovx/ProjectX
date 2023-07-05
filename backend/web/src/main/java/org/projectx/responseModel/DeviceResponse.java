package org.projectx.responseModel;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Builder;

import org.projectx.model.Coordinates;
import org.projectx.model.Device;

@Data
@Builder
public class DeviceResponse {
    private String id;

    private String name;

    private Coordinates coordinates;

    private boolean isOutdoor;

    private boolean isActivated;

    private LocalDateTime createdOn;

    private LocalDateTime activatedOn;

    private String user;

    public static DeviceResponse of(Device device) {
        DeviceResponse response = DeviceResponse
                .builder()
                .id(device.getId())
                .name(device.getName())
                .isOutdoor(device.isOutdoor())
                .isActivated(device.isActivated())
                .createdOn(device.getCreatedOn())
                .activatedOn(device.getActivatedOn())
                .coordinates(device.getCoordinates())
                .user(device.getUser().getUsername())
                .build();

        return response;
    }
}