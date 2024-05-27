package org.sensornetwork.device.domain;

import lombok.Data;
import lombok.Builder;

import java.util.List;

@Data
@Builder
public class DeviceDescription {
    private boolean indoor;

    private String controller;

    private List<String> sensors;

    private int trafficInArea;

    private int industryInArea;
}