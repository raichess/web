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
                        System.out.println(error("Missing parameters x, y or r"));
                        continue;
                    }
                    String xStr = params.get("x");
                    String yStr = params.get("y");
                    String rStr = params.get("r");
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
                            System.out.println(response(xStr, yStr, rStr,hit, startTime));
                        }

                } catch (Exception e) {
                    System.out.println(error("Unknown exception: " + e.getMessage()));
                }
            } else {
                System.out.println(error("Method not allowed. Only GET supported."));
            }
        }
    }

    private static String error(String msg) {
        String content = "{\"error\":\"" + msg + "\"}";
        return """
               Content-Type: application/json; charset=utf-8
               Status: 400 Bad Request
               
               %s
               """.formatted(content);
    }

    private static LinkedHashMap<String, String> parse(String query) {
        LinkedHashMap<String, String> result = new LinkedHashMap<>();
        for (String pair : query.split("&")) {
            String[] parts = pair.split("=");
            result.put(parts[0], parts[1]);
        }
        return result;
    }

    private static String response(String x, String y, String r, boolean hit, long startTime) {
        String content = String.format(
                "{\"x\":\"%s\",\"y\":\"%s\",\"r\":\"%s\",\"hit\":%s,\"time\":\"%s\",\"scriptTime\":%s}",
                x, y, r, hit,
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")),
                (double)(System.nanoTime() - startTime) / 10000000
        );

        return """
               Content-Type: application/json; charset=utf-8
               Status: 200 OK
               
               %s
               """.formatted(content);
    }


}
