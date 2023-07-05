package org.projectx.requestModel;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Valid
public class AuthRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}