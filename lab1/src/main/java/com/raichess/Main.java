package com.raichess;

import com.fastcgi.FCGIInterface;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;


public class Main {
    public static void main(String[] args) {
        FCGIInterface fcgiInterface = new FCGIInterface();
        Validation validation = new Validation();
        HitCheck hitCheck = new HitCheck();
        while (fcgiInterface.FCGIaccept() >= 0) {
            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method == null) {
                System.out.println(error("Unsupported HTTP method: null"));
                continue;
            }
            if (method.equals("GET")) {
                long startTime = System.nanoTime();
                String queryString = FCGIInterface.request.params.getProperty("QUERY_STRING");
                if (queryString == null || queryString.isEmpty()) {
                    System.out.println(error("Empty GET-request"));
                    continue;
                }
                LinkedHashMap<String, String> params;
                try {
                    params = parse(queryString);
                } catch (Exception e) {
                    System.out.println(error("Invalid GET-request: "));
                    continue;
                }
                try {
                    if (!params.containsKey("x") || !params.containsKey("y") || !params.containsKey("r")) {
                        throw new RuntimeException("Invalid GET-request: missing parameters");
                    } else {
                        float x, y;
                        int r;
                        try {
                            x = Float.parseFloat(params.get("x"));
                            y = Float.parseFloat(params.get("y"));
                            r = Integer.parseInt(params.get("r"));
                        } catch (NumberFormatException e) {
                            System.out.println(error("Parameters must be numbers! "));
                            continue;
                        }
                        if (!validation.validateXYR(x, y, r)) {
                            System.out.println(error("Invalid parameters !"));
                        } else {
                            boolean hit = hitCheck.checkHit(x, y, r);
                            long elapsed = System.nanoTime() - startTime;
                            System.out.println(createJSON(x, y, r, hit, elapsed));
                        }


                    }
                } catch (Exception e) {
                    System.out.println(error("Unknown exception: " + e.getMessage()));
                }

            }
        }
    }

    private static String error(String message) {
        return String.format("{\"error\":\"%s\"}", message);
    }

    private static LinkedHashMap<String, String> parse(String query) {
        LinkedHashMap<String, String> result = new LinkedHashMap<>();
        for (String pair : query.split("&")) {
            String[] parts = pair.split("=");
            result.put(parts[0], parts[1]);
        }
        return result;
    }

    private static String createJSON(float x, float y, int r, boolean hit, long scriptTime) {
        return """
                {"x": %.2f, "y": %.2f, "r": %d, "hit": %b, "time": "%s", "scriptTime": %.3f}
                """.formatted(
                x, y, r, hit,
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")),
                scriptTime / 1_000_000.0
        );
    }

}
