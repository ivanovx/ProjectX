package pro.ivanov.webapp.entity;

import lombok.Data;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table
public class Token {
    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private UUID id;

    @Column
    private String token;

    public boolean revoked;

    public boolean expired;
}
