package pro.ivanov.webapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("devices")
public class Device {
    @Id
    private String id;

    private String name;

    private Coordinates coordinates;

    private boolean isOutdoor;

    private boolean isActivated;

    private LocalDateTime createdOn;

    private LocalDateTime activatedOn;

    @DBRef
    private User user;
}