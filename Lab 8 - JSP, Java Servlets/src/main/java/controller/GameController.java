package controller;

import model.Board;
import model.GameData;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class GameController extends HttpServlet {
    private User firstPlayer = null;
    private User secondPlayer = null;
    private Boolean isFirstPlayer;
    private Connection connection = null;
    public Board board = new Board();

    public GameController() {
        super();
        isFirstPlayer = true;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/tictactoe", "paul", "1234");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void addToDatabase(User user) {
        try {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    String query = "INSERT INTO board (player_id, x, y, value) VALUES (?, ?, ?, ?)";
                    PreparedStatement statement = connection.prepareStatement(query);
                    statement.setDouble(1, user.getUserId());
                    statement.setInt(2, i);
                    statement.setInt(3, j);
                    statement.setString(4, "");

                    statement.execute();
                }
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

    private void updateDatabase(User user) {
        try {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    String query = "UPDATE board SET value = ? WHERE player_id = ? AND x = ? AND y = ?";
                    PreparedStatement statement = connection.prepareStatement(query);
                    statement.setString(1, board.getForPosition(i, j));
                    statement.setDouble(2, user.getUserId());
                    statement.setInt(3, i);
                    statement.setInt(4, j);

                    statement.execute();
                }
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

    private void flushForUser(HttpServletResponse response) throws IOException {
        response.getWriter().print("[");
        for (int i = 0; i < 2; i++) {
            response.getWriter().print("[");
            for (int j = 0; j < 2; j++) {
                response.getWriter().print("\"" + board.getForPosition(i, j) + "\"" + ",");
            }
            response.getWriter().print("\"" + board.getForPosition(i, 2) + "\"" + "],");
        }
        response.getWriter().print("[");
        for (int j = 0; j < 2; j++) {
            response.getWriter().print("\"" + board.getForPosition(2, j) + "\"" + ",");
        }
        response.getWriter().print("\"" + board.getForPosition(2, 2) + "\"" + "]]");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (firstPlayer == null || secondPlayer == null) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\": \"there should be 2 players connected.\"}");
            response.getWriter().flush();
            return;
        }

        response.setContentType("application/json");

        response.getWriter().print("{\"response\":\"success\",\"board\":");

        flushForUser(response);

        response.getWriter().print("}");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getSession().getAttribute("GameData") == null) {
            GameData data = new GameData();
            if (firstPlayer == null) {
                firstPlayer = new User(data.userId);
                addToDatabase(firstPlayer);
            } else {
                secondPlayer = new User(data.userId);
                addToDatabase(secondPlayer);
            }

            request.getSession().setAttribute("GameData", data);
        }

        User currentUser;
        User otherUser;
        if (((GameData) (request.getSession().getAttribute("GameData"))).userId.equals(firstPlayer.getUserId())) {
            currentUser = firstPlayer;
            otherUser = secondPlayer;
        } else {
            currentUser = secondPlayer;
            otherUser = firstPlayer;
        }

        Integer x = Integer.parseInt(request.getParameter("x"));
        Integer y = Integer.parseInt(request.getParameter("y"));
        String value = request.getParameter("value");;

        if ((isFirstPlayer && currentUser != firstPlayer) || (!isFirstPlayer && currentUser != secondPlayer)) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\":\"other player's turn.\"}");
            response.getWriter().flush();
            return;
        }

        if (x < 0 || x > 2 || y < 0 || y > 2 || !(value.equals("X") || value.equals("0"))) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\":\"x, y, or value is/are wrong.\"}");
            response.getWriter().flush();
            return;
        }

        if (!board.isFree(x, y)) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\":\"position is not free.\"}");
            response.getWriter().flush();
            return;
        }

        board.setForPosition(x, y, value);

        isFirstPlayer = !isFirstPlayer;

        if (!board.verifyWinner().equals("")) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\":\"We have a winner.\"}");
            response.getWriter().flush();
            board = new Board();
            return;
        }

        if (board.verifyDraw()) {
            response.setContentType("application/json");
            response.getWriter().print("{\"response\":\"It is a draw.\"}");
            response.getWriter().flush();
            board = new Board();
            return;
        }

        response.setContentType("application/json");
        response.getWriter().print("{\"response\":\"success\"}");
        response.getWriter().flush();
        updateDatabase(currentUser);
        updateDatabase(otherUser);
    }
}
