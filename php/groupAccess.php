<?php
try{

    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    $sql = "select * from an_access where group_id =".$_GET['id'];
    $res = $pdo->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    $returnArr = array(
        'success'=>true,
        'data'=>$res->fetchAll()
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
}
