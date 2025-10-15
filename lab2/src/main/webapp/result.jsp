<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.raichess.model.Dot" %>
<%@ page import="java.util.List" %>
<html>
<head>
    <title>Результаты проверки</title>
    <style>
        body {
            text-align: center;
            margin: 0;
            font-family: fantasy;
            background-image: url(background.jpg);
            background-size: 100% auto;
            background-repeat: no-repeat;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            color: rgb(172, 0, 92);
        }

        header {
            color: rgb(234, 10, 129);
            background-color: rgb(255, 129, 192);
            padding: 20px 0;
        }
        #table_container {
            margin: 20px 25px;
            margin-top: auto;
        }

        #result_table {
            width: 100%;
            font-size: 20px;
            text-align: center;
            border: 2px solid rgb(172, 0, 92);
            border-radius: 9px;
            border-collapse: collapse;
            height: 10%;
        }

        #result_table th {
            background: rgb(255, 153, 204);
            border: 2px solid rgb(172, 0, 92);
            width: 16.66%;
        }

        #result_table td {
            background: #FAF0E3;
            border: 2px solid rgb(172, 0, 92);
            width: 16.66%;
        }
    </style>
</head>
<body>
<header>
    <h1 id="name">Рогович Мария Михайловна P3213</h1>
    <h1 id="variant">Вариант 467242</h1>
</header>
<h2 style="text-align:center;">Результат проверки точки</h2>

<%
    List<Dot> results = (List<Dot>) application.getAttribute("results");

    if (results != null && !results.isEmpty()) {
        Dot lastDot = results.get(0);
%>
<div id="table_container">
    <table id="result_table">
        <tr><th>X</th><td><%= lastDot.getX() %></td></tr>
        <tr><th>Y</th><td><%= lastDot.getY() %></td></tr>
        <tr><th>R</th><td><%= lastDot.getR() %></td></tr>
        <tr><th>Попадание</th><td><%= lastDot.isHit() ? "Да" : "Нет" %></td></tr>
        <tr><th>Время</th><td><%= lastDot.getCurrentTime() %></td></tr>
        <tr><th>Время выполнения (с)</th><td><%= lastDot.getExecutionTime() %></td></tr>
    </table>
    <%
    } else {
    %>
    <p>Нет данных для отображения.</p>
    <%
        }
    %>

    <div style="margin-top: 20px;">
        <a href="index.jsp"> Отправить еще запрос ! </a>
    </div>
</div>
</body>
</html>