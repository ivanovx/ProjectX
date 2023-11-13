package org.projectx.stat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class StatsApplication {
	public static void main(String[] args) {
		SpringApplication.run(StatsApplication.class, args);
	}
}