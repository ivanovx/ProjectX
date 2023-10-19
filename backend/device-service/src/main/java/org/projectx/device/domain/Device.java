package org.projectx.device.domain;

import java.time.LocalDateTime;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private ObjectId id;

    private String name;

    private ObjectId user;

    private String controller;

    private String[] sensors;

    private boolean outdoor;

    private LocalDateTime created;

    private LocalDateTime modified;

    private LocalDateTime activated;

    private Coordinates coordinates;
}