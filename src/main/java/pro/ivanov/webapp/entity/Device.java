package pro.ivanov.webapp.entity;

import lombok.Data;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Table
public class Device {

    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private UUID id;

    @Column
    private String title;

    @Column
    private boolean isActive;

    @Column
    private Coordinates coordinates;
}
