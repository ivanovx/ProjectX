package org.projectx.stat;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/stats")
public class StatController {

    @GetMapping
    public Mono<String> hello() {
        return Mono.just("Hello from stats");
    }
}
