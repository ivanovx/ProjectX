package org.projectx.user.domain;


import org.projectx.user.request.SignInRequest;
import org.projectx.user.request.SignUpRequest;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.password.PasswordEncoder;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<User> signUp(@RequestBody SignUpRequest request) {
        User user = new User();

        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPassword(this.passwordEncoder.encode(request.password()));

        return this.userRepository.save(user);
    }

    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.OK)
    public Mono<User> signIn(@RequestBody SignInRequest request) {
        return this.userRepository.findByUsername(request.username());
    }
}
