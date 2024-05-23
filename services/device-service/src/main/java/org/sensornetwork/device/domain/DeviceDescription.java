package org.sensornetwork.device.domain;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeviceDescription {
    private boolean indoor;

    private int trafficInArea;

    private int industryInArea;
}