package pro.ivanov.webapp.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.ivanov.webapp.inputModel.AuthenticationRequest;
import pro.ivanov.webapp.inputModel.AuthenticationResponse;
import pro.ivanov.webapp.inputModel.RegisterRequest;
import pro.ivanov.webapp.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signUp(@RequestBody RegisterRequest request) {
        AuthenticationResponse response = this.authService.signUp(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> signIn(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = this.authService.signIn(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        AuthenticationResponse response = this.authService.refreshToken(request);

        return ResponseEntity.ok(response);
    }
}