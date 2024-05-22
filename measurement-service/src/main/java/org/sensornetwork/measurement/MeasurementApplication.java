package org.sensornetwork.measurement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MeasurementApplication {
	public static void main(String[] args) {
		SpringApplication.run(MeasurementApplication.class, args);
	}
}