package pro.ivanov.webapp.entity;

import java.util.UUID;

public class Token {
    private String id;

    private String token;

    public boolean revoked;

    public boolean expired;
}
