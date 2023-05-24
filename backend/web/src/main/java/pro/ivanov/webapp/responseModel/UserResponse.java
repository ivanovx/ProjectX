package pro.ivanov.webapp.responseModel;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import pro.ivanov.webapp.model.Role;
import pro.ivanov.webapp.model.User;

import java.time.LocalDateTime;
import java.util.Set;

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
                .name(user.getName())
                .email(user.getEmail())
                .created(user.getCreated())
                .modified(user.getModified())
                .username(user.getUsername())
                .build();
    }
}
