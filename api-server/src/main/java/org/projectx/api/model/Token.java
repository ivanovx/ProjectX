package org.projectx.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("tokens")
public class Token {
    @Id
    private String id;

    private String device;

    private String value;

    private LocalDateTime expiration;
}