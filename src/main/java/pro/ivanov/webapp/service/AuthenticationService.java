package pro.ivanov.webapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pro.ivanov.webapp.entity.User;
import pro.ivanov.webapp.inputModel.AuthenticationRequest;
import pro.ivanov.webapp.inputModel.AuthenticationResponse;
import pro.ivanov.webapp.inputModel.RegisterRequest;
import pro.ivanov.webapp.repository.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    //private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public User signUp(RegisterRequest request) {
        User user = new User();

        user.setId(UUID.randomUUID());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        //user.setVerified(true);
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));

       /* if (this.repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with %s email already exist".formatted(user.getEmail()));
        }*/

        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        //saveUserToken(savedUser, jwtToken);

        return savedUser;
    }

    public AuthenticationResponse signIn(AuthenticationRequest request) {
        /*authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );*/

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

       // revokeAllUserTokens(user);
        //saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    /*private void saveUserToken(User user, String jwtToken) {
        Token token = new Token();

        token.setToken(jwtToken);
        token.setExpired(false);
        token.setRevoked(false);

        tokenRepository.save(token);
    }*/

   /* private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                //revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }*/
    }