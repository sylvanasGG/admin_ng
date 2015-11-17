<?php
try{
    $params = json_decode(file_get_contents('php://input'),true);

    $adminGroup   = $params['adminGroup'];

    $pdo = new PDO("mysql:host=localhost;dbname=angularjs;charset=utf8","root","root");
    $sql = "insert into an_group(group_name) values(?)";
    $stmt = $pdo->prepare($sql);
    $res = $stmt->execute(array($adminGroup));
    $returnArr = array(
        'success'=>true,
    );
    echo json_encode($returnArr);

}catch(PDOException $e){
    $arr = array(
        'success'=>false,
        'data'=>array(
            'msg'=>$e->getMessage()
        )
    );
    echo json_encode($arr);
    //echo $e->getMessage();
}
