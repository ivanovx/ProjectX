package org.projectx.deviceservice.device;

import lombok.Data;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String name;

    private String userId;

    private String controller;

    private List<String> sensors;

    private LocalDateTime timestamp;

    private DeviceLocation location;

    private DeviceDescription description;
}
