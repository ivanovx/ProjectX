package org.sensornetwork.device.handler;

import org.sensornetwork.device.domain.Device;
import org.sensornetwork.device.domain.DeviceRepository;
import org.sensornetwork.device.domain.DeviceRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyExtractor;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Component
public class DeviceHandler {
    private final DeviceRepository deviceRepository;

    public DeviceHandler(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Mono<ServerResponse> getAllDevices(ServerRequest request) {
        Flux<Device> devices = deviceRepository.findAll();

        return ServerResponse.ok().body(devices, Device.class);
    }

    public Mono<ServerResponse> getAllDevicesByUser(ServerRequest request) {
        //request.principal().map(principal -> (Jwt) principal);

        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .map(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return deviceRepository.findAllByUserId(userId);
                })
                .flatMap(devices ->  ServerResponse.ok().body(devices, Device.class));
    }

    public Mono<ServerResponse> getDevice(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return deviceRepository
                .findById(deviceId)
                .flatMap(device -> ServerResponse.ok().body(device, Device.class))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createDevice(ServerRequest request) {
        //Jwt jwt = request.principal().map(principal -> (Jwt) principal)
        //@AuthenticationPrincipal Jwt jwt, @RequestBody DeviceRequest request) {

        /*String userId = jwt.getClaimAsString("userId");

        Device device = new Device();

        device.setUserId(userId);
        device.setName(request.name());
        device.setSensors(request.sensors());
        device.setTimestamp(LocalDateTime.now());
        device.setController(request.controller());
        device.setLocation(request.location());
        device.setDescription(request.description());

        return this.deviceRepository.save(device);*/

        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .flatMap(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return request.bodyToMono(DeviceRequest.class).flatMap(deviceRequest -> {
                        Device device = new Device();

                        device.setUserId(userId);
                        device.setName(deviceRequest.name());
                        device.setSensors(deviceRequest.sensors());
                        device.setTimestamp(LocalDateTime.now());
                        device.setController(deviceRequest.controller());
                        device.setLocation(deviceRequest.location());
                        device.setDescription(deviceRequest.description());

                        //return device;
                        return deviceRepository.save(device).flatMap(d -> ServerResponse.status(201).bodyValue(d));
                    });
                });
    }

}
