package org.projectx.response;

import lombok.Builder;
import lombok.Data;
import org.projectx.model.User;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private String name;

    private String username;

    private String email;

    private LocalDateTime created;

    private LocalDateTime modified;

    public static UserResponse of(final User user) {
        return UserResponse
                .builder()
                .email(user.getEmail())
                .created(user.getCreated())
                .modified(user.getModified())
                .username(user.getUsername())
                .build();
    }
}
