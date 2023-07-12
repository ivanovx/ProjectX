package org.projectx.response;

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

    private LocalDateTime created;

    private LocalDateTime modified;

    private LocalDateTime activated;

    private String user;

    public static DeviceResponse of(Device device) {
        DeviceResponse response = DeviceResponse
                .builder()
                .id(device.getId())
                .name(device.getName())
                .isOutdoor(device.isOutdoor())
                .isActivated(device.isActivated())
                .created(device.getCreated())
                .activated(device.getActivated())
                .coordinates(device.getCoordinates())
                .user(device.getUser().getUsername())
                .build();

        return response;
    }
}