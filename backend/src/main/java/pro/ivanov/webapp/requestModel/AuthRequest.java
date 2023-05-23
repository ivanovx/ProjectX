package pro.ivanov.webapp.requestModel;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;

    private String password;
}