package controller;

import model.Authenticator;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RegisterController extends HttpServlet {

    public RegisterController() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String password_confirmation = request.getParameter("password_confirmation");

        Authenticator authenticator = new Authenticator();
        String result = authenticator.register(username, password, password_confirmation);

        if (result.equals("error"))
            request.getRequestDispatcher("error-login.jsp").forward(request, response);
        else {
            RequestDispatcher requestDispatcher;

            requestDispatcher = request.getRequestDispatcher("/index.jsp");

            requestDispatcher.forward(request, response);
        }
    }
}
