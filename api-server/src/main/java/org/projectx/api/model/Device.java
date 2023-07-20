package org.projectx.api.model;

import lombok.Data;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String user;

    private String name;

    private boolean activated;

    private LocalDateTime createdOn;

    private LocalDateTime updatedOn;

    private LocalDateTime activatedOn;

    private Coordinates coordinates;
}