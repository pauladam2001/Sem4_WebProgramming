<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
<div style="display: flex; justify-content: center">
    <form action="RegisterController" method="post" style="display: flex; flex-direction: column; width: 400px">
        Enter username : <input type="text" name="username"> <br>
        Enter password : <input type="password" name="password"> <br>
        Enter password confirmation : <input type="password" name="password_confirmation"> <br>
        <input type="submit" value="Register"/>
    </form>
</div>
</body>
</html>