package org.projectx.auth.request;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginRequest {
    private String username;
}
