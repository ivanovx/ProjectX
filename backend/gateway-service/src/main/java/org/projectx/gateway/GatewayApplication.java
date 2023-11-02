package org.projectx.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

// https://docs.spring.io/spring-authorization-server/reference/guides/how-to-pkce.html

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}