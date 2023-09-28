package org.projectx.measurement.pipeline;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Slf4j
@Component
public class MeasurementConsumer {

    @Bean
    public Consumer<String> onReceive() {
        return (message) -> {
            log.info("Received the value {} in Consumer", message);
        };
    }
}