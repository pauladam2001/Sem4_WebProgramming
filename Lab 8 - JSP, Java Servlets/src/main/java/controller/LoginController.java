package controller;

import model.Authenticator;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginController extends HttpServlet {
    private int numberOfPlayers;

    public LoginController() {
        super();
        numberOfPlayers = 0;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        Authenticator authenticator = new Authenticator();
        String result = authenticator.authenticate(username, password);

        if (result.equals("error"))
            request.getRequestDispatcher("error-login.jsp").forward(request, response);
        else {
            RequestDispatcher requestDispatcher;

            if (numberOfPlayers < 2) {
                numberOfPlayers += 1;

//                HttpSession session = request.getSession();
//                session.setAttribute("username", username);

                requestDispatcher = request.getRequestDispatcher("/success.jsp");
            } else {
                requestDispatcher = request.getRequestDispatcher("/error-max-players.jsp");
            }

            requestDispatcher.forward(request, response);
        }
    }
}
