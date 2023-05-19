package pro.ivanov.webapp.requestModel;

import lombok.Data;
import pro.ivanov.webapp.model.Coordinates;

@Data
public class DeviceRequest {
    private String name;

    private boolean isOutdoor;

    private Coordinates coordinates;
}
