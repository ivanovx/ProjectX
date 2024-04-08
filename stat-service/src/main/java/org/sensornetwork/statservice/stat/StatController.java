package org.sensornetwork.statservice.stat;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
public class StatController {

    @GetMapping
    public Mono<String> index() {
        return Mono.just("Hello from stats");
    }
}
