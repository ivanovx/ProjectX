package org.projectx.auth.domain;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserClient {
    @PostMapping(value = "/user/{username}")
    User getUser(@PathVariable String username);
}
