package pro.ivanov.webapp.responseModel;

import lombok.Builder;
import lombok.Data;
import pro.ivanov.webapp.model.Coordinates;

@Data
@Builder
public class DeviceResponse {
    private String name;

    private Coordinates coordinates;

    private String user;
}
