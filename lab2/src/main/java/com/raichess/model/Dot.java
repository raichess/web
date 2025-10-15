package com.raichess.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Dot {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String executionTime;
    private String currentTime;

    public Dot(double x, double y, double r, boolean hit, String executionTime, String currentTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.executionTime = executionTime;
        this.currentTime = currentTime;

    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }
}
