<?php
try{
    $params = json_decode(file_get_contents('php://input'),true);

    $id         = $params['u_id'];
    $username   = $params['username'];
    $password   = $params['password'];
    $email      = $params['email'];

    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    //$sql = "insert into an_user(username,password,email) values(?, ?, ?)";
    $sql="update an_user set username=? ,password=?,email=? where u_id=?";
    $stmt = $pdo->prepare($sql);
    $res = $stmt->execute(array($username, $password, $email,$id));
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
