package org.sensornetwork.common;

import java.security.SecureRandom;
import java.util.Base64;

public class TokenGenerator {
    public static String createToken(String deviceId) {

        return "todo-make-token-algo-" + deviceId;
    }

    private static final int KEY_LENGTH = 32; // Дължина на API ключа
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateApiKey() {
        byte[] randomBytes = new byte[KEY_LENGTH];
        RANDOM.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

}