package org.sensornetwork.stat.handler;

import com.netflix.discovery.EurekaClient;
import org.sensornetwork.common.response.DeviceResponse;
import org.sensornetwork.common.response.MeasurementResponse;
import org.sensornetwork.common.response.StatResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

//  .uri(uriBuilder -> uriBuilder.path("/file/").build())
//        .retrieve()                         // using retrieve since exchange() is deprecated

@Component
public class StatHandler {
    private WebClient deviceWebClient;

    private WebClient measurementsWebClient;

    private final EurekaClient eurekaClient;

    public StatHandler(EurekaClient eurekaClient) {
        this.eurekaClient = eurekaClient;

        String devicesBaseUrl = eurekaClient.getNextServerFromEureka("device-service", false).getHomePageUrl();
        String measurementsBaseUrl = eurekaClient.getNextServerFromEureka("measurement-service", false).getHomePageUrl();

        this.deviceWebClient = WebClient
                .builder()
                .baseUrl(devicesBaseUrl)
                .build();

        this.measurementsWebClient =WebClient
                .builder()
                .baseUrl(measurementsBaseUrl)
                .build();
    }

    public Mono<ServerResponse> getDeviceStats(ServerRequest request) {
            String deviceId = request.pathVariable("deviceId");

            Mono<DeviceResponse> getDeviceData = deviceWebClient.get()
                    .uri("/devices/" + deviceId)
                    .retrieve()
                    .bodyToMono(DeviceResponse.class);

            Flux<MeasurementResponse> getDeviceMeasurements = measurementsWebClient.get()
                .uri("/measurements/" + deviceId)
                .retrieve()
                .bodyToFlux(MeasurementResponse.class);
                //.bodyToMono(DeviceResponse.class);

                return getDeviceData.flatMap(data -> {
                    return getDeviceMeasurements.collectList().flatMap(measurements -> {
                        StatResponse response = StatResponse.builder()
                                .data(data)
                                .measurements(measurements)
                                .build();

                        return ServerResponse.ok().bodyValue(response);
                    });
                });



           // return
            //StatResponse response = StatResponse.builder()
             //       .data()
               //     .build();

            // return tokenCircuitBreaker.run(response); //, throwable -> ServerResponse.ok().bodyValue(null)); //.bodyValue(throwable.getMessage()));
           // return tokenCircuitBreaker.run(ServerResponse.ok().body(getDeviceToken, TokenResponse.class));
            //throwable -> ServerResponse.ok().bodyValue(null));
    }

    //public record StatResponse(Mono<DeviceResponse> data, Flux<MeasurementResponse> measurements){}
}
