package com.raichess.beans;

import com.raichess.managers.DataBaseManager;
import com.raichess.managers.HitCheck;
import com.raichess.models.Point;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Named("pointBean")
@SessionScoped
public class PointBean  implements Serializable {

    @Inject
    private DataBaseManager db;

    private double x;
    private double y;
    private double r = 1;

    private final HitCheck hitCheck = new HitCheck();

    public void checkPoint() {
        long startTime = System.nanoTime();
        boolean isHit = hitCheck.checkHit(x, y, r);
        long endTime = System.nanoTime();
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        String executionTime = Double.toString((double) (endTime - startTime) / 1000000000);
        Point newPoint = new Point(x, y, r, isHit, executionTime, currentTime);
        db.savePoint(newPoint);
    }
    public double getX() {
        return x;
    }
    public void setX(double x) {
        this.x = x;
    }
    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }
    public double getR() {
        return r;
    }
    public void setR(double r) {
        this.r = r;
    }

}
