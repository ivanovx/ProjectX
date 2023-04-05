package pro.ivanov.webapp.entity;

import lombok.Data;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@Data
@UserDefinedType(value = "coordinates_type")
public class Coordinates {
    @Column
    @CassandraType(type = CassandraType.Name.DOUBLE)
    private double x;

    @Column
    @CassandraType(type = CassandraType.Name.DOUBLE)
    private double y;

    public Coordinates(double x, double y) {
        this.x = x;
        this.y = y;
    }
}