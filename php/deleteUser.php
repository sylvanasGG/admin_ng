<?php
try{
    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    $sql = "delete from an_user where u_id =?";
    $stmt = $pdo->prepare($sql);
    $res = $stmt->execute(array($_GET['id']));
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
