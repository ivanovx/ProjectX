package org.projectx.tokenservice.token;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document("tokens")
public class Token {
    @Id
    private String id;

    private String deviceId;

    private String value;

    private LocalDateTime createdAt;

    private LocalDateTime expiredAt;
}
