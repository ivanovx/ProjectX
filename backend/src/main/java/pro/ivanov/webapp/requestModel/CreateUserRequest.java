package pro.ivanov.webapp.requestModel;

import lombok.Data;
import lombok.NonNull;

@Data
public class CreateUserRequest {
    @NonNull
    private String name;

    @NonNull
    private String email;

    @NonNull
    private String password;
}