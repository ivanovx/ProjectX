package org.sensornetwork.device.domain;

import lombok.Data;
import lombok.Builder;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("devices")
public class Device {
    @Id
    private String id;

    private String name;

    private String userId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private DeviceLocation location;

    private DeviceDescription description;
}
