package pro.ivanov.webapp.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pro.ivanov.webapp.ApiRequestException;
import pro.ivanov.webapp.model.User;
import pro.ivanov.webapp.repository.UserRepository;
import pro.ivanov.webapp.requestModel.AuthRequest;
import pro.ivanov.webapp.requestModel.CreateUserRequest;
import pro.ivanov.webapp.responseModel.AuthResponse;
import pro.ivanov.webapp.responseModel.UserResponse;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JwtService jwtService, AuthenticationManager authManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // TODO
    // Roles
    public UserResponse signUp(CreateUserRequest request) {
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));

        user.setCreated(LocalDateTime.now());
        user.setActive(false);
        user.setModified(null);

        return UserResponse.of(this.userRepository.save(user));
    }

    public AuthResponse signIn(AuthRequest request) {
        this.authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = this.userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new ApiRequestException("User with %s username not found".formatted(request.getUsername())));

        String token = this.jwtService.generateToken(user);
        String refreshToken = this.jwtService.generateRefreshToken(user);

        return AuthResponse
                .builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponse refreshToken(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // THROW
        }

        final String refreshToken = authHeader.substring(7);
        final String username = jwtService.extractUsername(refreshToken);

        if (username == null) {
            // THROW
        }

        User user = this.userRepository.findByUsername(username).orElseThrow();
        String accessToken = this.jwtService.generateToken(user);

        return AuthResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}