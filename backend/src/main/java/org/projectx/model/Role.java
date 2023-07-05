package org.projectx.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

@Data
@Document("roles")
public class Role implements GrantedAuthority {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    @Override
    public String getAuthority() {
        return this.name;
    }
}
