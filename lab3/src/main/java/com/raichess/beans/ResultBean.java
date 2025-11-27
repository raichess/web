package com.raichess.beans;

import com.raichess.managers.DataBaseManager;
import com.raichess.models.Point;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("results")
@ApplicationScoped
public class ResultBean implements Serializable {

    @Inject
    private DataBaseManager db;

    public List<Point> getResults() {
        return db.getAllPoints();
    }
    public synchronized void addResult(Point newPoint) {
        db.savePoint(newPoint);
    }
    public void clearResult() {
        db.clearAllPoints();
    }
    public String getJsonPoints() {
        List<Point> points = db.getAllPoints();
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        for (Point p : points) {
            if (!first) sb.append(",");
            sb.append(String.format("{\"x\":%f,\"y\":%f,\"r\":%f,\"hit\":%b}",
                    p.getX(), p.getY(), p.getR(), p.isHit()));
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }

}
