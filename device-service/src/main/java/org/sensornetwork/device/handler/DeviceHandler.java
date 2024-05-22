package org.sensornetwork.device.handler;

import org.sensornetwork.device.domain.Device;
import org.sensornetwork.device.domain.DeviceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class DeviceHandler {
    private final DeviceRepository deviceRepository;

    public DeviceHandler(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Mono<ServerResponse> getAllDevices(ServerRequest request) {
        Flux<Device> devices = deviceRepository.findAll();

        return ServerResponse.ok().body(devices, Device.class);


        //return this.deviceRepository.findAll();
    }

    public Mono<ServerResponse> getAllDevicesByUser(ServerRequest request) {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .map(jwt -> {
                    String userId = jwt.getClaimAsString("userId");

                    return deviceRepository.findAllByUserId(userId);
                })
                .flatMap(devices ->  ServerResponse.ok().body(devices, Device.class));
    }
}
