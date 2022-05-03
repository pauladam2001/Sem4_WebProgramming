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
  $password = md5(mysqli_real_escape_string($con, $request->data->password));

  if (!empty($username) && !empty($password)) {
    $sql = "SELECT * FROM `user` WHERE username='$username' AND password='$password'";

    if ($result = mysqli_query($con, $sql)) {
        $row = mysqli_fetch_assoc($result);

        $user = [
            'id' => (int)$row['ID'],
            'username' => $username
        ];

        $_SESSION['userId'] = 'true';

        echo json_encode($user);
    } else
    {
        http_response_code(422);
    }
  }
}

?>