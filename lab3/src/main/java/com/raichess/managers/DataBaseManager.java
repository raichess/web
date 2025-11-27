package com.raichess.managers;

import com.raichess.models.Point;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.List;

@ApplicationScoped
@Transactional
public class DataBaseManager implements Serializable {

    @PersistenceContext(unitName = "Lab3PersistenceUnit")
    public EntityManager em;

    public void savePoint(Point point) {
        em.persist(point);
    }

    public List<Point> getAllPoints() {
        return em.createQuery("SELECT p FROM Point p ORDER BY p.id DESC", Point.class)
                .getResultList();
    }

    public void clearAllPoints() {
        em.createQuery("DELETE FROM Point").executeUpdate();
    }


}
