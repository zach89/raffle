<?php
header("Content-Type: text/html;charset=utf-8");
require_once ("./zsql.php");
$a = new Z_Mysql;
//$a = new SaeMysql();

//获取员工列表
if(isset($_POST['action']) && $_POST['action'] == 'epg'){
        $sql = "SELECT * FROM user";
		$b = $a->getData($sql);
		$c = json_encode($b);
        echo $c;
    }

//添加员工
if(isset($_POST['action']) && $_POST['action'] == 'btnt'){
    if($_POST['epn']==""){
        echo "请输入";
    }else{ 
        $epg = $_POST['epg'];
        $epn = $_POST['epn'];    
        $sql = "INSERT INTO user VALUES ('$epn' , '$epg' , '')";
        $a->runSql($sql);
        echo "添加成功";
    }
}
//修改部门
if(isset($_POST['action']) && $_POST['action'] == 'updata'){
    $name = $_POST['name'];
    $team = $_POST['team'];
    $sqlu = "UPDATE `raffle`.`user` SET team = '$team' WHERE  `user`.`name` = '$name'";
    $a->runSql($sqlu);
    //echo $group;
    echo "修改成功";
}
//删除员工
if(isset($_POST['action']) && $_POST['action'] == 'del'){
    $name = $_POST['name'];
    $sql = "delete from `user` WHERE `name` = '$name'";
    $a->runSql($sql);
    //echo $number;
    echo "删除成功";
}


//重置中奖名单
if(isset($_POST['action']) && $_POST['action'] == 'res'){
    $sqlres = "UPDATE `user` SET `res` =  null";
    $a->runSql($sqlres);
    echo "中奖名单已经重置";
}
//中奖后处理
if(isset($_POST['action']) && $_POST['action'] == 'rs'){
    $ns = $_POST['ns'];
    $arr = explode(':',$ns);
    $name = $arr[1];
    $rs = $_POST['rs'];
    $sqlu = "UPDATE `user` SET `res` =  '$rs' WHERE  `user`.`name` = '$name'";
    $a->runSql($sqlu);
    //echo $group;
    //echo "修改成功";
}
//获取中奖名单
if(isset($_POST['action']) && $_POST['action'] == 'get_winner'){
    $sql = "SELECT * FROM user WHERE `user`.`res` != '' ORDER BY `user`.`res` ";
	$b = $a->getData($sql);
	$c = json_encode($b);
    echo $c;
}