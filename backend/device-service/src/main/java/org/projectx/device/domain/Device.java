package org.projectx.device.domain;

import java.time.LocalDateTime;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String userId;

    private String name;

    private String controller;

    private String[] sensors;

    private boolean outdoor;

    private LocalDateTime created = LocalDateTime.now();

    private LocalDateTime modified = null;

    private LocalDateTime activated = null;

    private Coordinates coordinates;
}