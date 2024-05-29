package org.sensornetwork.common.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StatResponse {
    private DeviceResponse data;

    private List<MeasurementResponse> measurements;
}
