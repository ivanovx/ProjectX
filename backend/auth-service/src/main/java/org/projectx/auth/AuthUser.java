package org.projectx.auth;

import java.util.List;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.projectx.auth.domain.User;

public class AuthUser implements UserDetails {
    private final String username;

    private final String password;

    private final boolean active;

    private final List<String> roles;

    public static AuthUser of(User user) {
        return new AuthUser(user.getUsername(), user.getPassword(), true, user.getRoles());
    }

    public AuthUser(String username, String password, boolean active, List<String> roles) {
        this.username = username;
        this.password = password;
        this.active = active;
        this.roles = roles;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role)).toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}