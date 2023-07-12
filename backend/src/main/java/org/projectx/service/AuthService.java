package org.projectx.service;

import jakarta.servlet.http.HttpServletRequest;
import org.projectx.repository.UserRepository;
import org.projectx.request.AuthRequest;
import org.projectx.request.CreateUserRequest;
import org.projectx.response.AuthResponse;
import org.projectx.response.UserResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.projectx.ApiRequestException;
import org.projectx.model.User;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // TODO
    // Roles
    public UserResponse signUp(CreateUserRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));

        user.setCreated(LocalDateTime.now());
        user.setModified(null);

        return UserResponse.of(this.userRepository.save(user));
    }

    public AuthResponse signIn(AuthRequest request) {
        this.authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = this.userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new ApiRequestException("User with %s username not found".formatted(request.getUsername())));

        String token = JwtService.generateToken(user);
        String refreshToken = JwtService.generateRefreshToken(user);

        return AuthResponse
                .builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponse refreshToken(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ApiRequestException("Need to send auth token.");
        }

        String refreshToken = authHeader.substring(7);
        String username = JwtService.extractUsername(refreshToken);

        if (username == null) {
            throw new ApiRequestException("Need send username.");
        }

        User user = this.userRepository.findByUsername(username).orElseThrow();
        String accessToken = JwtService.generateToken(user);

        return AuthResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}