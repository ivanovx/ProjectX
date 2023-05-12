package pro.ivanov.webapp.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Device {
    @Id
    private String id;

    private String title;

    private Coordinates coordinates;

    @DBRef
    private User user;
}
