package org.projectx.device.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("devices")
public class Device {
    private String id;

    private String userId;

    private String name;

    private boolean activated;

    private String[] sensors;

    private String controller;

    private LocalDateTime timestamp;

    private DeviceDescription description;

    private DeviceCoordinates coordinates;
}
