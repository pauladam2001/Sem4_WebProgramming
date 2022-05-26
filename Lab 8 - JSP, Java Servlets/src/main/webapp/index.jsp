<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<div style="display: flex; flex-direction: column; justify-content: center; margin-left: 30em">
    <form action="LoginController" method="post" style="display: flex; flex-direction: column; width: 400px">
        Enter username : <input type="text" name="username"> <br>
        Enter password : <input type="password" name="password"> <br>
        <input type="submit" value="Login"/>
    </form>

    <p>Don't have an account? <a href="register.jsp">Register!</a></p>
</div>
</body>
</html>