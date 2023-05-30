package pro.ivanov.mqtt;

import org.springframework.integration.annotation.MessagingGateway;

@MessagingGateway(defaultRequestChannel="mqttChannel")
public interface MyGateway {

    void sendToMqtt(String data);
}