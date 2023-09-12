package pro.ivanov.first;

import lombok.Data;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table
public class Device {
    @PrimaryKey
    private UUID id;

    private String name;

    private String description;
}
