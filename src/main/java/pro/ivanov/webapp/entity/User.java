package pro.ivanov.webapp.entity;

import lombok.Data;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table
public class User {
    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private UUID id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private boolean isVerified;
}
