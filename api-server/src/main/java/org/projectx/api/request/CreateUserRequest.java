package org.projectx.api.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
@Valid
public class CreateUserRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}