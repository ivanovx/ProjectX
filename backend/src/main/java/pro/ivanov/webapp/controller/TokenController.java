package pro.ivanov.webapp.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.model.Token;
import pro.ivanov.webapp.repository.DeviceRepository;
import pro.ivanov.webapp.repository.TokenRepository;

@RestController
@RequestMapping("/token")
public class TokenController {
    private final TokenRepository tokenRepository;
    private final DeviceRepository deviceRepository;
    public TokenController(TokenRepository tokenRepository, DeviceRepository deviceRepository) {
        this.tokenRepository = tokenRepository;
        this.deviceRepository = deviceRepository;
    }

    @PostMapping("/create/{deviceId}")
    public Token createToken(@PathVariable String deviceId) {
        Device device = this.deviceRepository.findById(deviceId).orElseThrow();

        Token token = new Token();

        token.setDevice(device);
        token.setAccessKey("sample-access-key");
        token.setSecretKey("sample-secret-key");

        return this.tokenRepository.save(token);
    }

    @PostMapping("/get/{deviceId}")
    public Token findToken(@PathVariable String deviceId) {
        return this.tokenRepository.findByDeviceId(deviceId).orElseThrow();
    }
}