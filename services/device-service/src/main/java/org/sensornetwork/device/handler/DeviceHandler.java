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

    public Mono<ServerResponse> getDevices(ServerRequest request) {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .flatMap(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return ServerResponse.ok().body(deviceRepository.findAllByUserIdOrderByCreatedAtDesc(userId), Device.class);
                })
                .switchIfEmpty(ServerResponse.ok().body(deviceRepository.findAll(), Device.class));
    }


    public Mono<ServerResponse> getDevice(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return deviceRepository
                .findById(deviceId)
                .flatMap(device -> ServerResponse.ok().bodyValue(device))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createDevice(ServerRequest request) {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .flatMap(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return request.bodyToMono(DeviceRequest.class).map(deviceRequest -> {
                        Device device = Device.builder()
                                .userId(userId)
                                .name(deviceRequest.name())
                                .updatedAt(null)
                                .createdAt(LocalDateTime.now())
                                .description(deviceRequest.description())
                                .location(deviceRequest.location())
                                .build();

                        return deviceRepository.save(device);
                    }).flatMap(device -> ServerResponse.status(201).body(device, Device.class));
                });
    }

    public Mono<ServerResponse> updateDevice(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        Mono<Device> device = deviceRepository.findById(deviceId);

        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .flatMap(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return request.bodyToMono(DeviceRequest.class).flatMap(deviceRequest -> {
                        return device.flatMap(d -> {
                            if (d.getUserId().compareTo(userId) != 0){
                                return ServerResponse.badRequest().build();
                            }

                            d.setName(deviceRequest.name());
                            d.setUpdatedAt(LocalDateTime.now());
                            d.setDescription(deviceRequest.description());

                            return deviceRepository.save(d).flatMap(updatedDevice -> ServerResponse.ok().bodyValue(updatedDevice));
                        });
                    });
                });
    }

    public Mono<ServerResponse> deleteDevice(ServerRequest request) {
        String deviceId = request.pathVariable("deviceId");

        return deviceRepository.findById(deviceId)
                .flatMap(device -> {
                    deviceRepository.deleteById(device.getId());

                    return ServerResponse.ok().body(device, Device.class);
                });
    }
}
