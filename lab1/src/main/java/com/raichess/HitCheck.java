package com.raichess;

public class HitCheck {

    private boolean triangle(float x, float y, int r) {
        return x >= 0 && y <= 0 && y <= 2 * x - r;
    }

    private boolean rectangle(float x, float y, int r) {
        return x <= 0 && x >= -r / 2 && y <= 0 && y >= -r;
    }

    private boolean circle(float x, float y, int r) {
        return (x <= 0 && x >= -r / 2) && (y >= 0 && y <= r / 2) && (x * x + y * y <= (r / 2) * (r / 2));
    }

    public boolean checkHit(float x, float y, int r) {
        return triangle(x, y, r) || rectangle(x, y, r) || circle(x, y, r);
    }
}
