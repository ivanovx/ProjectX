package pro.ivanov.webapp.responseModel;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Builder;

import pro.ivanov.webapp.model.Coordinates;

@Data
@Builder
public class DeviceResponse {
    private String name;

    private Coordinates coordinates;

    private boolean isActivated;

    private LocalDateTime createdOn;

    private LocalDateTime activatedOn;

    private String user;
}