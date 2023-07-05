package org.projectx.model;

import java.time.LocalDateTime;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String name;

    private Coordinates coordinates;

    private boolean isOutdoor;

    private boolean isActivated;

    private LocalDateTime created;

    private LocalDateTime modified;

    private LocalDateTime activated;

    @DBRef
    private User user;
}