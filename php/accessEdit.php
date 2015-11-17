<?php
try{
    $params = json_decode(file_get_contents('php://input'),true);

    $id = $_GET['id'];
    $pdo = new PDO("mysql:host=localhost;dbname=angularjs","root","root");
    $stmt=$pdo->prepare("DELETE FROM an_access WHERE group_id=?");
    $stmt->execute(array($id));


    foreach ($params as $key=>$val) {
       if($val == true){

            $sql = "insert into an_access(group_id,access) values(?, ?)";
            $stmt = $pdo->prepare($sql);
            $res = $stmt->execute(array($id, $key));
       }

    }

    $returnArr = array(
        'success'=>true
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
