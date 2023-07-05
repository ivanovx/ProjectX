package org.projectx.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.projectx.requestModel.AuthRequest;
import org.projectx.requestModel.CreateUserRequest;
import org.projectx.responseModel.AuthResponse;
import org.projectx.responseModel.UserResponse;
import org.projectx.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signUp(@RequestBody CreateUserRequest request) {
        UserResponse response = this.authService.signUp(request);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody AuthRequest request) {
        AuthResponse response = this.authService.signIn(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request) {
        AuthResponse response = this.authService.refreshToken(request);

        return ResponseEntity.ok(response);
    }
}