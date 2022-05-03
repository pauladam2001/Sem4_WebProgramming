<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$postdata = file_get_contents("php://input");

echo $postdata;

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $isLoggedIn = $_SESSION['userId']; 
  if ($isLoggedIn != 'true') {
    http_response_code(422);
    return;
  }

  $title = mysqli_real_escape_string($con, $request->data->title);
  $description = mysqli_real_escape_string($con, $request->data->content);
  $producer = mysqli_real_escape_string($con, $request->data->producer);
  $category = mysqli_real_escape_string($con, $request->data->category);
  $date = mysqli_real_escape_string($con, date('Y/m/d H:i:s'));
//   $user_id = mysqli_real_escape_string($con, (int)$request->data->user_id);  
  $user_id = 1;

  $sql = mysqli_prepare($con, 'INSERT INTO `News` (`content`, `title`, `producer`, `date`, `category`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)');
  mysqli_stmt_bind_param($sql, "sssssi", $description, $title, $producer, $date, $category, $user_id);

  if(mysqli_stmt_execute($sql))
  {
    http_response_code(201);
    $news = [
      'id'    => mysqli_insert_id($con),
      // 'id' => 3,
      'title' => $title,
      'content' => $description,
      'producer' => $producer,
      'category' => $category,
      'date' => $date,
      'user_id' => $user_id
    ];
    echo json_encode(['data'=>$news]);
  }
  else
  {
    http_response_code(422);
  }
}

?>