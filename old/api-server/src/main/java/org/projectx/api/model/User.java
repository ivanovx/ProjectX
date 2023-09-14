package org.projectx.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;

    private String email;

    private String username;

    private String password;

    private LocalDateTime created;

    private LocalDateTime modified;

    private boolean verified;

    private List<String> roles;
}