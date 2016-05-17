<?php
header("Content-type: text/html; charset=utf-8");
require_once ("./zsql.php");
$zsql = new Zach_Mysql;
//$sql = "DELETE FROM user WHERE name = 'zach88'";
$sql = "INSERT INTO user VALUES ('很好吧','不好')";

$zsql->runSql($sql);
echo '你好';
//$sql1 = 'SELECT * FROM user';
//$result = $zsql->getData($sql1);
//echo $result[0]['name']; 