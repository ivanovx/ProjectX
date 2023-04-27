package pro.ivanov.webapp.entity;

import lombok.Data;

@Data
public class Coordinates {
    private double x;

    private double y;

    public Coordinates(double x, double y) {
        this.x = x;
        this.y = y;
    }
}