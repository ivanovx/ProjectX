package org.projectx.user;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user")
public class UserController {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserController(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        User user = this.userRepository.findByUsername(username).orElseThrow();

        return user;
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody CreateUserRequest request) {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setCreated(LocalDateTime.now());
        user.setModified(null);

       return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(this.userRepository.save(user));
    }
}
