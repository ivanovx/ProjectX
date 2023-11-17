package org.projectx.deviceservice.device;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeviceDescription {
    private boolean indoor;

    private int trafficInArea;

    private int industryInArea;
}