package pro.ivanov.webapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("tokens")
public class Token {
    @Id
    private String id;

    private String accessKey;

    private String secretKey;

    @DBRef
    @Indexed
    private Device device;
}
