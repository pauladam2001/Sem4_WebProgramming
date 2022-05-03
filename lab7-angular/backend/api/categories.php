<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$categories = [];
$sql = "SELECT DISTINCT category FROM News";

if($result = mysqli_query($con, $sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $categories[$cr] = $row['category'];
    $cr++;
  }

  echo json_encode(['data'=>$categories]);
}
else
{
  http_response_code(404);
}

?>