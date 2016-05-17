<?php
header("Content-Type: text/html;charset=utf-8");
require_once ("./zsql.php");
$a = new Z_Mysql;
//$a = new SaeMysql();
//获取抽奖名单
if(isset($_POST['action']) && $_POST['action'] == 'get'){
        $sql = "SELECT * FROM `user`";
        $b = $a->getData($sql);
        $c = '';
        foreach ($b as $key => $value) {
            $c = $c.$value['team'].":".$value['name'].",";
        };
        $c = substr($c,0,-1);
        echo $c;
    }
//?
if(isset($_POST['action']) && $_POST['action'] == 'set'){
                                      
        $rs = $_POST['rs'];
        $data = str_replace(',', "\r\n", $rs);
        $file = './rs.txt';
        file_put_contents($file, $data);
        return true;
    }
//获取奖项
if(isset($_POST['action']) && $_POST['action'] == 'jx'){
    $sql1 = "SELECT * FROM jx ORDER BY jx.number DESC";
    $jx = $a->getData($sql1);
    $jxe = json_encode($jx);
    echo $jxe;
}

//设置奖项
if(isset($_POST['action']) && $_POST['action'] == 'btnt'){

    if($_POST['jx']==""){
        echo "请输入";
    }else{
    $num = $_POST['num'] - 2;
    $jx = $_POST['jx'];
    $jxl = $_POST['jxl'];
    
    $sql = "INSERT INTO jx VALUES ('$num', '$jx' , '$jxl')";
    $a->runSql($sql);
    echo "添加成功";
    }
}

//删除奖项
if(isset($_POST['action']) && $_POST['action'] == 'del'){
    $number = $_POST['number'];
    $sql = "DELETE FROM jx WHERE number = '$number'";
    $a->runSql($sql);
    echo "删除成功";
}
//更新奖项
if(isset($_POST['action']) && $_POST['action'] == 'updata'){
    $jx = $_POST['jx'];
    $jxl = $_POST['jxl'];
    $number = $_POST['number'];
    $sql = "UPDATE `raffle`.`jx` SET jx = '$jx', jxl = '$jxl' WHERE `jx`.`number` = $number;";
    $a->runSql($sql);
    echo '修改成功';
}

//获取奖项
if(isset($_POST['action']) && $_POST['action'] == 'jxt'){
    $sql1 = "SELECT * FROM `jx` order by `number` asc";
    $jx = $a->getData($sql1);
    $jxe = json_encode($jx);
    echo $jxe;
}