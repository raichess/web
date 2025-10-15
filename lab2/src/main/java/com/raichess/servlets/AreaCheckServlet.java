package com.raichess.servlets;

import com.raichess.manager.HitCheck;
import com.raichess.model.Dot;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        HitCheck hitCheck = new HitCheck();
        long startTime = System.nanoTime();
        try {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));

            boolean hit = hitCheck.checkHit(x, y, r);
            long endTime = System.nanoTime();
            String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            String executionTime = Double.toString((double) (endTime - startTime) / 1000000000);
            Dot dot = new Dot(x, y, r, hit, currentTime, executionTime);
            ServletContext context = getServletContext();
            List<Dot> results = (List<Dot>) context.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
            }
            results.add(0, dot);
            context.setAttribute("results", results);
            req.setAttribute("dot", dot);
            req.getRequestDispatcher("/result.jsp").forward(req, resp);
        } catch (NumberFormatException e) {
            resp.getWriter().println("<h3>Ошибка: неверный формат числа!</h3>");
        } catch (Exception e) {
            resp.getWriter().println("<h3>Ошибка: " + e.getMessage() + "</h3>");
        }
    }

}
