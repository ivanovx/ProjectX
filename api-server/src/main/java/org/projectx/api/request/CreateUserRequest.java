package org.projectx.api.request;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String email;

    private String username;

    private String password;
}
