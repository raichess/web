package beans;

import com.raichess.models.Point;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("results")
@ApplicationScoped
public class ResultBean implements Serializable {
    private List<Point> results;

    @PostConstruct
    public void init() {
        results = new ArrayList<>();
    }
    public List<Point> getResults() {
        return results;
    }
    public synchronized void addResult(Point newPoint) {
        results.add(0, newPoint);
    }
    public void clearResult() {
        results.clear();
    }

}
