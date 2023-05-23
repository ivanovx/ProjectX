package pro.ivanov.webapp.requestModel;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String username;

    @NotNull
    private String password;
}