package org.projectx.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Token {
    @Id
    private String id;

    private String deviceId;

    private String value;
}
