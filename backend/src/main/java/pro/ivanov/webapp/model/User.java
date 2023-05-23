package pro.ivanov.webapp.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

// TODO FIX VALIDATIONS
// ISSUE ABOUT VALIDATION
// NEED FAST FIX
@Data
@Document("users")
public class User implements UserDetails {
    @Id
    private String id;

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    @Indexed(unique = true)
    private String username;

    @Email
    @NotBlank
    @Indexed(unique = true)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private boolean active;

    @DBRef
    private Set<Role> roles;

    @PastOrPresent
    private LocalDateTime created;

    @PastOrPresent
    private LocalDateTime modified;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}