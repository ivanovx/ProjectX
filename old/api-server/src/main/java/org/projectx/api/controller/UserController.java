package org.projectx.api.controller;

import org.projectx.api.model.User;
import org.projectx.api.request.CreateUserRequest;
import org.projectx.api.service.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserClient userClient;

    @PostMapping("/create")
    public User create(@RequestBody CreateUserRequest request) {
        return this.userClient.createUser(request);
    }
}
