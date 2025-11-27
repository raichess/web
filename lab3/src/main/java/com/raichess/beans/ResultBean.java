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

}
