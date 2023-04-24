package pro.ivanov.webapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/signin")
    public String signIn() {
        return "sign-in";
    }

    @PostMapping("/signup")
    public String signUp() {
        return "sign-up";
    }
}
