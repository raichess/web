package com.raichess;

import java.util.Set;

public class Validation {
    private final Set<Float> xValues = Set.of(-2F, -1F, -1.5F, 0F, 1F, 1.5F, 2F);
    private final Set<Integer> rValues = Set.of(1, 2, 3, 4, 5);

    private boolean validateX(float x) {
        return xValues.contains(x);
    }

    private boolean validateR(int r) {
        return rValues.contains(r);
    }

    private boolean validateY(float y) {
        return y >= -5 && y <= 5;
    }

    public boolean validateXYR(float x, float y, int r) {
        return validateX(x) && validateY(y) && validateR(r);
    }
}
