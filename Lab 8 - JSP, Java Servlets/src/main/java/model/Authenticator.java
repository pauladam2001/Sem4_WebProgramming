package model;

import java.sql.*;

public class Authenticator {
    private Statement statement;

    public Authenticator() {
        connect();
    }

    public void connect() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/tictactoe", "paul", "1234");
            statement = connection.createStatement();
        } catch (Exception e) {
            System.out.println("Error connecting: " + e.getMessage());
        }
    }

    public String authenticate(String username, String password) {
        ResultSet resultSet;
        String result = "error";
        System.out.println(username + ", " + password);
        try {
            resultSet = statement.executeQuery("SELECT * FROM users WHERE username='"+username+"' AND password='"+password+"'");
            if (resultSet.next())
                result = "success";
            resultSet.close();
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
        return result;
    }

    public String register(String username, String password, String password_confirmation) {
        String result = "error";

        if (password.equals(password_confirmation)) {
            try {
                statement.executeUpdate("INSERT INTO users (username, password) VALUES ('"+username+"', '"+password+"')");
                result = "success";
            } catch (SQLException sqle) {
                sqle.printStackTrace();
            }
        }

        return result;
    }
}
