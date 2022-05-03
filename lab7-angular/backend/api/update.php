<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $isLoggedIn =  $_SESSION['userId']; 
  if ($isLoggedIn != 'true') {
    http_response_code(422);
    return;
  }
 
  $id = mysqli_real_escape_string($con, (int)$request->data->id);
  $title = mysqli_real_escape_string($con, $request->data->title);
  $description = mysqli_real_escape_string($con, $request->data->content);
  $producer = mysqli_real_escape_string($con, $request->data->producer);
  $category = mysqli_real_escape_string($con, $request->data->category);
  $date = mysqli_real_escape_string($con, date('Y/m/d H:i:s'));
  $oldTitle = mysqli_real_escape_string($con, $request->oldTitle); 

  $sql = "UPDATE `News` SET `content`='$description', `title`='$title', `producer`='$producer', `category`='$category' WHERE `title` = '$oldTitle' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}

?>