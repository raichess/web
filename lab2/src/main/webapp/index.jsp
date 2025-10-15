<%@ page import="com.raichess.model.Dot" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Лаб1</title>
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
        }

        header {
            color: rgb(234, 10, 129);
            background-color: rgb(255, 129, 192);
            padding: 20px 0;
        }

        #name {
            -webkit-text-stroke: 0.25px black;
            font-size: 36px;
        }

        #variant {
            font-size: 24px;
        }

        #main {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 50px;
        }

        #form {
            text-align: left;
            margin: 20px;
            width: 60%;
        }

        #form .label_name {
            color: rgb(172, 0, 92);
            font-weight: bold;
            font-size: 28px;
        }

        #form label {
            color: rgb(200, 24, 118);
            font-size: 20px;
        }

        #form .radio_X {
            color: rgb(200, 24, 118);
            font-size: 24px;
        }

        #button_container button {
            width: 150px;
            height: 40px;
            border-radius: 15px;
            margin-top: 12px;
            border: 2px solid rgb(172, 0, 92);
            background-color: rgb(255, 153, 204);
            font-size: 13px;
            color: black;
        }

        #button_container > button:hover {
            background-color: #E3EDFA;
        }

        #canvas_container {
            width: 30%;
            display: flex;
            justify-content: right;
            align-items: flex-start;
        }
        #error {
            color: rgb(172, 0, 92);
            background: white;
            border: 1px solid rgb(255, 153, 204);
            width: 40%;
            margin-top: 10px;

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

<div id="main">
    <form id="form" method="get" action="controller">
        <div id="choice_x">
            <span class="label_name">Введите X: </span>
            <label><input class="radio_X" type="radio" name="x" value="-3">-3</label>
            <label><input class="radio_X" type="radio" name="x" value="-2">-2</label>
            <label><input class="radio_X" type="radio" name="x" value="-1">-1</label>
            <label><input class="radio_X" type="radio" name="x" value="0">0</label>
            <label><input class="radio_X" type="radio" name="x" value="1">1</label>
            <label><input class="radio_X" type="radio" name="x" value="2">2</label>
            <label><input class="radio_X" type="radio" name="x" value="3">3</label>
            <label><input class="radio_X" type="radio" name="x" value="4">4</label>
            <label><input class="radio_X" type="radio" name="x" value="5">5</label>
        </div>
        <div id="choice_y">
            <span class="label_name">Введите Y: </span>
            <label><input type="text" id="y" placeholder="От -5 до 5"></label>
        </div>
        <div id="choice_r">
            <span class="label_name">Введите R: </span>
            <label><input type="checkbox" name="r" class="checkbox_r" value="1">1</label>
            <label><input type="checkbox" name="r" class="checkbox_r" value="1.5">1.5</label>
            <label><input type="checkbox" name="r" class="checkbox_r" value="2">2</label>
            <label><input type="checkbox" name="r" class="checkbox_r" value="2.5">2.5</label>
            <label><input type="checkbox" name="r" class="checkbox_r" value="3">3</label>
        </div>
        <div id="button_container">
            <button id="submit" type="submit">Отправить</button>
            <button id="clear" type="button">Очистить</button>
        </div>
        <div class="error" id="error"></div>
    </form>
    <div id="canvas_container">
        <canvas id="canvas_graph" width="500" height="500"></canvas>
    </div>
</div>
<form id="canvas_form" method="get" action="controller" style="display:none;">
    <input type="hidden" id="canvas_x" name="x">
    <input type="hidden" id="canvas_y" name="y">
    <input type="hidden" id="canvas_r" name="r">
</form>
<div id="table_container">
    <table id="result_table">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Попадание</th>
            <th>Дата</th>
            <th>Время работы (с)</th>
        </tr>
        </thead>
        <tbody>
        <%
            List<Dot> dots = (List<Dot>) application.getAttribute("results");
            if (dots != null && !dots.isEmpty()) {
                for (Dot dot : dots) {
        %>
        <tr>
            <td><%= dot.getX() %></td>
            <td><%= dot.getY() %></td>
            <td><%= dot.getR() %></td>
            <td><%= dot.isHit() ? "Да" : "Нет" %></td>
            <td><%= dot.getCurrentTime() %></td>
            <td><%= dot.getExecutionTime() %></td>
        </tr>
        <%
            }
        } else {
        %>
        <p>Нет данных для отображения.</p>
        <%
            }
        %>
        </tbody>
    </table>
</div>
<script type="module" src="mainscript.js"></script>
</body>
</html>
