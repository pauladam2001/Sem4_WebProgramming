<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');


require 'connect.php';

$dates = [];
$sql = "SELECT DISTINCT date FROM News";

if($result = mysqli_query($con, $sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $dates[$cr] = $row['date'];
    $cr++;
  }

  echo json_encode(['data'=>$dates]);
}
else
{
  http_response_code(404);
}

?>