<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = mysqli_real_escape_string($con, $request->data->username);
  $email = mysqli_real_escape_string($con, $request->data->email);
  $password = md5(mysqli_real_escape_string($con, $request->data->password));
  $confirm_password = md5(mysqli_real_escape_string($con, $request->data->confirm_password));

  if (!empty($username) && !empty($password) && $password == $confirm_password) {
    $sql = "SELECT * FROM `user` WHERE username='$username' AND password='$password'";
    $result = mysqli_query($con,$sql);

    if ($result->num_rows > 0) {
        http_response_code(422);
    } else {
        $sql = "INSERT INTO `user` (username, password, email) VALUES ('$username', '$password', '$email')";
        $result = mysqli_query($con,$sql);
        http_response_code(200);
    }
  }
}

?>