package org.projectx.model;

import java.time.LocalDateTime;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String name;

    private String user;

    private String controller;

    private String[] sensors;

    private boolean outdoor;

    private LocalDateTime created;

    private LocalDateTime modified;

    private LocalDateTime activated;

    private Coordinates coordinates;
}