<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'paul');
define('DB_PASS', '1234');
define('DB_NAME', 'NewsService');

function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  session_start();

  if (mysqli_connect_errno()) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();

?>