<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$news = [];
$sql = "SELECT * FROM News";

if($result = mysqli_query($con, $sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $news[$cr]['id']    = $row['ID'];
    $news[$cr]['title'] = $row['title'];
    $news[$cr]['content'] = $row['content'];
    $news[$cr]['producer'] = $row['producer'];
    $news[$cr]['category'] = $row['category'];
    $news[$cr]['date'] = $row['date'];
    $news[$cr]['user_id'] = $row['user_id'];
    $cr++;
  }

  echo json_encode(['data'=>$news]);
}
else
{
  http_response_code(404);
}

?>