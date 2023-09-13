package org.projectx.api.controller;

import lombok.Data;
import org.projectx.api.model.User;
import org.projectx.api.repository.UserRepository;
import org.projectx.api.request.CreateUserRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class UserController {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserController(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping("/user/{username}")
    public UserResponse user(@PathVariable String username) {
        User user = this.userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with %s username is not found".formatted(username)));

        UserResponse response = new UserResponse();

        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setPassword(user.getPassword());
        response.setRoles(user.getAuthorities().stream().map(role -> role.getAuthority()).toList());

        return response;
    }

    @PostMapping("/user/create")
    public ResponseEntity create(@RequestBody CreateUserRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setCreated(LocalDateTime.now());

       return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(this.userRepository.save(user));
    }

    @Data
    public class UserResponse {
        private String username;

        private String password;

        private String email;

        private List<String> roles;
    }
}
