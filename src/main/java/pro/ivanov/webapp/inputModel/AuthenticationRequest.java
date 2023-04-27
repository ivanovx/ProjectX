package pro.ivanov.webapp.inputModel;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}