package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@SpringBootApplication
@RestController
public class FirstApplication {
	public static void main(String[] args) {
		SpringApplication.run(FirstApplication.class, args);
	}

	@RequestMapping("/")
	public String index() {
		return "Hello from first";
	}

	@RequestMapping("/greeting")
	public String greeting() {
		return "Greeting from first";
	}
}
