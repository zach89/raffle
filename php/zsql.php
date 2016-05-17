<?php
header("Content-type: text/html; charset=utf-8");
class Z_Mysql{
	//$sql1 = 'SELECT * FROM user';
	function getData($sql){
		$mysqli = new mysqli('localhost','root','password','raffle');
		if (mysqli_connect_errno()){
			die('Could not connect: ' . mysql_error());
		}
		$mysqli->query("set names 'utf8'");
		$result = $mysqli->query($sql);
		$myArray = array();
		while ($row = $result->fetch_array(MYSQL_ASSOC)) {
			$myArray[] = $row;
		}
		$result->close();
		$mysqli->close();
		return $myArray;
	}

	function runSql($sql){
		$mysqli = new mysqli('localhost','root','password','raffle');
		if (mysqli_connect_errno()){
			die('Could not connect: ' . mysql_error());
		}
		$mysqli->query("set names 'utf8'");
		$mysqli->query($sql);
		$mysqli->close();
	}

}
?>
