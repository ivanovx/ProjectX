package org.projectx.user;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String email;

    private String username;

    private String password;
}
