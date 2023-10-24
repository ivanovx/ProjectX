package org.projectx.user.domain;

import lombok.Data;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String username;

    private String password;

    private LocalDateTime created = LocalDateTime.now();

    private LocalDateTime modified = null;

    private boolean verified = true;

    private List<String> roles = List.of("USER", "ADMIN");
}