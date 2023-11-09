package org.projectx.device.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeviceDescription {
    private boolean indoor;

    private int ovenInArea;

    private int trafficInArea;

    private int industryInArea;
}
