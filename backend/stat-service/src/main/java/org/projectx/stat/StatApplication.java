package org.projectx.stat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class StatApplication {
	public static void main(String[] args) {
		SpringApplication.run(StatApplication.class, args);
	}
}