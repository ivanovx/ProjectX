package org.projectx.user.domain;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.projectx.user.request.UserLoginRequest;
import org.projectx.user.request.CreateUserRequest;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody UserLoginRequest request) {
        User user = this.userRepository.findByUsername(request.getUsername()).orElseThrow();

        return ResponseEntity.status(200).body(user);
    }

    @PostMapping("/create")
    public ResponseEntity createUser(@RequestBody CreateUserRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setCreated(LocalDateTime.now());
        user.setModified(null);

       return ResponseEntity.status(201).body(this.userRepository.save(user));
    }
}
