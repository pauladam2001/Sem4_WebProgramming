<%@ page import="static java.lang.Math.max" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>TicTacToe</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
</head>
<body>
<style style="display: flex; justify-content: center">
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        float: left;
        margin: 5px;
    }
    .board {
        float: left;
        padding: 15px;
    }
</style>
<script>
    $(document).ready(function() {
        $("#submit_position").click(function() {
            let x = $("#x_position").val();
            let y = $("#y_position").val();
            let value = $("#value").val();
            $.post("/GameController?x=" + x + "&y=" + y + "&value=" + value, function (response) {
                if (response["response"] === "success") {
                    // alert("I'm here");
                }
                else if (response["response"] === "We have a winner.") {
                    alert("We have a winner!")
                }
                else if (response["response"] === "It is a draw.") {
                    alert("It is a draw!")
                }
                else {
                    alert(response["response"]);
                }
                $("#x_position").val("");
                $("#y_position").val("");
                $("#value").val("");
            });
        });

        let myFunction = function() {
            $.get("/GameController", function (response) {
                if (response["response"] === "success") {
                    let boardd = response["board"];
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (boardd[i][j] === "X") {
                                $("#id" + (i * 3 + j)).text("X");
                            }
                            else if (boardd[i][j] === "0") {
                                $("#id" + (i * 3 + j)).text("0");
                            }
                            else {
                                $("#id" + (i * 3 + j)).text("");
                            }
                        }
                    }
                } else {
                    // alert(response["response"]);
                }
            });
        }
        setInterval(myFunction, 1200);
    });
</script>

<%
    out.print("<div class=\"container\">");
    out.print("<div class=\"board\">");
    out.print("<p>Board</p>");
    out.print("<table>");
    for (int i = 0; i < 4; ++i) {
        out.print("<tr>");
        for (int j = 0; j < 4; ++j) {
            if (i != 0 && j != 0) {
                out.print("<td id=\"id" + ((i - 1) * 3 + (j - 1)) + "\">&nbsp &nbsp</td>");
            }else {
                out.print("<td>&nbsp" + max(max(i - 1, j - 1), 0) + "&nbsp</td>");
            }
        }
        out.print("</tr>");
    }
    out.print("</table>");
    out.print("</div>");
%>

<div class="container">
    <div class="board">
        <p>Submit position</p>
        x:<br>
        <label for="x_position"></label><input type="text" name="x" id="x_position"><br>
        y:<br>
        <label for="y_position"></label><input type="text" name="y" id="y_position"><br>
        value: (X or 0)<br>
        <label for="value"></label><input type="text" name="value" id="value"><br>
        <button id="submit_position">Submit</button>
    </div>
<%--    <div style="float: right">--%>
<%--        <button id="Logout">Log out</button>--%>
<%--    </div>--%>
</div>
</body>
</html>