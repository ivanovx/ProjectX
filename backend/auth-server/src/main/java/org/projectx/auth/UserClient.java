package org.projectx.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "app-service")
public interface UserClient {
    @GetMapping(value = "/user/{username}")
    User getUser(@PathVariable String username);
}
