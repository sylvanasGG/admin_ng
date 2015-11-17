<?php
try{
    $params = json_decode(file_get_contents('php://input'),true);

    $password   = $params['password'];
    $email      = $params['email'];

    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    $sql = 'select * from an_user where email ="'.$email.'" AND password = "'.$password.'"';
    $res = $pdo->query($sql);

    if ($res->rowCount() == 1) {
        $returnArr = array(
            'success'=>true,
            'data'=>$res->fetch()
        );
        echo json_encode($returnArr);exit;
    }

    echo json_encode(array('success'=>false));exit;

}catch(PDOException $e){
    $arr = array(
        'success'=>false,
        'data'=>array(
            'msg'=>$e->getMessage()
        )
    );
    echo json_encode($arr);
}
