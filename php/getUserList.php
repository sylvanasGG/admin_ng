<?php
try{
    
    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    $sql = "select * from an_user";
    $res = $pdo->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    $returnArr = array(
        'success'=>true,
        'data'=>$res->fetchAll()
    );
    echo json_encode($returnArr);
    //var_dump($res);
    // if($pdo->exec($sql))
    // {
    // 	echo $pdo -> lastinsertid();
    // }

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
