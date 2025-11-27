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
import java.util.Arrays;
import java.util.List;

@Named("pointBean")
@SessionScoped
public class PointBean implements Serializable {

    @Inject
    private DataBaseManager db;

    private double x;
    private double y;
    private double r = 1;

    private final List<Double> possibleRValues = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);
    private final List<Double> possibleYLinks = Arrays.asList(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5);

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

    // Для обработки нажатия на commandLink Y
    public String setYAndCheck(double yValue) {
        this.y = yValue;
        checkPoint();
        return null;
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

    public List<Double> getPossibleRValues() {
        return possibleRValues;
    }

    public List<Double> getPossibleYLinks() {
        return possibleYLinks;
    }

}
