package com.raichess.manager;

public class HitCheck {
    public boolean checkHit(double x, double y, double r) {
        if ((x >= 0) && (x <= r) && (y >= 0) && (y <= r) && (y <= -x + r)) {
            return true;
        }
        if ((x >= 0) && (x <= r) && (y <= 0) && (y >= -r)) {
            return true;
        }
        if (x <= 0 && y <= 0 && (x * x + y * y <= r * r)) {
            return true;
        }
        return false;
    }
}
