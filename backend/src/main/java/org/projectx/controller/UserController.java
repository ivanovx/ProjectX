package org.projectx.controller;

import org.projectx.responseModel.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.projectx.service.UserService;

// TODO
// Email service
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserResponse> index() {
        return this.userService.getAuthUser();
    }

    @PostMapping("/verify/{username}")
    public ResponseEntity<UserResponse> verify(@PathVariable String username) {
        return this.userService.verifyUser(username);
    }
}
