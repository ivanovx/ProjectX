package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@SpringBootApplication
@RestController
public class SecondApplication {
	public static void main(String[] args) {
		SpringApplication.run(SecondApplication.class, args);
	}

	@RequestMapping("/")
	public String index() {
		return "Hello from second";
	}

	@RequestMapping("/greeting")
	public String greeting() {
		return "Greeting from second";
	}
}
