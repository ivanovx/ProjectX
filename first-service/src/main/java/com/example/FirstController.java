package com.example;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirstController {
    @RequestMapping("/first")
    public String greeting() {
        return "Hello from first!";
    }

    @RequestMapping("/first/{id}")
    public String hello(@PathVariable String id) {
        return "Hello from first with %s".formatted(id);
    }
}
