package org.projectx.auth.domain;

import org.projectx.auth.request.LoginRequest;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface UserClient {
    @PostMapping(value = "/user/login")
    User getUser(@RequestBody LoginRequest request);
}
